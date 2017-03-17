import {
    ADVANCE_STEP,
    BACK,
    NEW_METRIC,
    RESET_NEW_QUESTION_FLOW,
    SELECT_FLOW,
    SET_DATABASE,
    SET_TABLE,
    SET_TIP,
    SELECT_METRIC,
    SELECT_METRIC_BREAKOUT
} from "./actions";

import QueryTypeList from "./components/QueryTypeList";

import MetricLanding from "./containers/MetricLanding";
import MetricBuilderDatabases from "./containers/MetricBuilderDatabases";
import MetricBuilderSchemas from "./containers/MetricBuilderSchemas";
import MetricBuilderTables from "./containers/MetricBuilderTables";

import MapLanding from "./containers/MapLanding";
import BreakoutSelection from "./containers/BreakoutSelection";

const tips = {
    start: {
        title: "The world's your oyster",
        text: "What do you want to know about your data? Want to see a chart? Try some of the options like timeseries or a map.\nJust want to see some information? Look at a segment or table. If you're really a pro you've probably already hit that SQL button."
    },
    metric: {
        title: "Don't fear the metric",
        text: "Despite their fancy sounding name, metrics are just numbers your company cares about. They provide starting points for you to further examine and slice in different ways."
    },
    database: {
        title: "Databi",
        text: "Your data lives in databases, which is good cause otherwise that'd be a silly name. Each database can have many tables, which are where individual values live."
    },
    schemas: {
        title: "Schemas",
        text: "All metrics start their lives as a table of data. Here are a few of the most used in your company. After you pick a table, you can pick what you want to know about it, like the how many total entries exist or what the average of a particular value is"
    },
    tables: {
        title: "Tables",
        text: "All metrics start their lives as a table of data. Here are a few of the most used in your company. After you pick a table, you can pick what you want to know about it, like the how many total entries exist or what the average of a particular value is"
    },
    breakout: {
        title: "Break it down",
        text: "It's often helpful to see a metric by one of its 'dimensions' to get a better sense of how it changes over time or based on a category. These are all the ways you can see the metric you selected."
    }
};

const initialStep = {
    subtitle: "What would you like to see #user.firstName",
    component: QueryTypeList,
    tip: tips["start"],
    back: false
};

const metricTitle = "Metrics";

const metric = [
    {
        title: "Pick a metric",
        component: MetricLanding,
        tip: tips["metric"]
    },
    {
        title: "How do you want to see this metric?",
        component: BreakoutSelection,
        tip: tips["breakout"]
    }
];

const newMetricSteps = [
    {
        title: "Pick a database",
        component: MetricBuilderDatabases,
        tip: tips["database"],
        skip: {
            resource: "databases",
            resolve: databases => databases.length > 0
        }
    },
    /*
    {
        title: "Pick a schema",
        component: MetricBuilderSchemas,
        tip: tips["schemas"],
        skip: {
            resource: 'schemas',
            resolve: (schemas) => schemas.length > 0
        }
    },
    */
    {
        title: "Pick a table",
        component: MetricBuilderTables,
        tip: tips["tables"],
        skip: false
    },
    {
        title: "Pick an aggregation",
        component: MetricBuilderTables,
        tip: tips["tables"],
        skip: false
    }
];

const segmentTitle = "View a segment or table";
const segment = newMetricSteps;

const geoTitle = "Metric on a map";
const geo = [
    {
        title: "What kind of map would you like to see?",
        component: MapLanding
    },
    {
        title: geoTitle,
        component: MetricLanding,
        tip: tips["metric"]
    },
    {
        title: "How do you want to see this metric?",
        component: BreakoutSelection,
        tip: tips["breakout"]
    }
];

const pivotTitle = "Pivot a metric";
const pivot = [
    {
        title: pivotTitle,
        component: MetricLanding,
        tip: tips["metric"]
    },
    {
        title: pivotTitle
    }
];

const timeSeriesTitle = "A metric as a timeseries";
const timeseries = [
    {
        title: "What metric do you want for your timeseries?",
        component: MetricLanding,
        tip: tips["metric"]
    },
    {
        title: "What time field would you like to use?",
        component: BreakoutSelection,
        tip: tips["breakout"]
    }
];

const titles = {
    geo: geoTitle,
    metric: metricTitle,
    pivot: pivotTitle,
    segment: segmentTitle,
    timeseries: timeSeriesTitle
};

const flows = {
    metric,
    geo,
    pivot,
    segment,
    timeseries
};

const setVizForFlow = flow => {
    switch (flow) {
        case "timeseries":
            return "line";
        case "geo":
            return "map";
        case "pivot":
        case "segment":
            return "table";
        default:
            return false;
    }
};

const initialState = {
    newMetric: false,
    currentStep: initialStep,
    flow: { title: "Start with..." },
    currentStepIndex: 0,
    card: {}
};

export default function(state = initialState, { type, payload, error }) {
    const { currentStepIndex, flow } = state;
    switch (type) {
        case RESET_NEW_QUESTION_FLOW:
            return initialState;
        case SET_TIP:
            return {
                ...state,
                currentStep: {
                    ...state.currentStep,
                    tip: payload
                }
            };
        case SELECT_METRIC:
            return {
                ...state,
                card: {
                    ...payload,
                    display: setVizForFlow(state.flow.type)
                }
            };
        case SELECT_METRIC_BREAKOUT:
            return {
                ...state,
                card: {
                    ...state.card,
                    dataset_query: {
                        ...state.card.dataset_query,
                        query: {
                            ...state.card.dataset_query.query,
                            breakout: [payload]
                        }
                    },
                    display: setVizForFlow(state.flow.type)
                }
            };
        case BACK:
            // TODO - hey, so if I go back, what happens to the query dict
            const newStepIndex = currentStepIndex - 1;

            // if the currentStepIndex is 0 then we're back at the beginning and
            // we should just reset
            if (currentStepIndex === 0) {
                return initialState;
            }

            return {
                ...state,
                currentStep: flows[flow.type][newStepIndex],
                currentStepIndex: newStepIndex
            };
        case NEW_METRIC:
            return {
                ...state,
                newMetric: true,
                currentStep: newMetricSteps[0]
            };
        case ADVANCE_STEP:
            return {
                ...state,
                currentStep: flows[flow.type][currentStepIndex + 1],
                currentStepIndex: currentStepIndex + 1
            };
        case SET_TABLE:
            return {
                ...state,
                card: {
                    ...state.card,
                    dataset_query: {
                        ...state.card.dataset_query,
                        query: {
                            ...state.card.dataset_query.query,
                            source_table: payload
                        }
                    }
                }
            };

        case SET_DATABASE:
            return {
                ...state,
                card: {
                    ...state.card,
                    ...payload
                }
            };
        case SELECT_FLOW:
            return {
                ...state,
                flow: {
                    type: payload,
                    title: titles[payload],
                    steps: flows[payload]
                },
                currentStep: flows[payload][state.currentStepIndex],
                card: {
                    ...state.card,
                    display: setVizForFlow(payload)
                }
            };
        default:
            return state;
    }
}

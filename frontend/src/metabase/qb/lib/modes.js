
import Q, { AggregationClause, NamedClause } from "metabase/lib/query"; // legacy query lib
import { isDate, isAddress, isCategory, getAggregator } from "metabase/lib/schema_metadata"
import * as Query from "metabase/lib/query/query";
import * as Card from "metabase/meta/Card";
import { format } from "metabase/lib/expressions/formatter";

import _ from "underscore";

import * as SegmentMode from "../components/modes/SegmentMode";
import * as MetricMode from "../components/modes/MetricMode";
import * as TimeseriesMode from "../components/modes/TimeseriesMode";
import * as GeoMode from "../components/modes/GeoMode";
import * as PivotMode from "../components/modes/PivotMode";
import * as NativeMode from "../components/modes/NativeMode";
import * as DefaultMode from "../components/modes/DefaultMode";

type QueryBuilderMode = string;

export function getMode(card, tableMetadata): QueryBuilderMode {
    if (!card || !tableMetadata) {
        return DefaultMode;
    }

    if (Card.isStructured(card)) {
        const query = Card.getQuery(card);
        const aggregations = Query.getAggregations(query);
        const breakouts = Query.getBreakouts(query);

        console.log('breakouts', breakouts)
        console.log('aggregations', aggregations)


        if (aggregations.length === 0 && breakouts.length === 0) {
            return SegmentMode;
        }
        if (aggregations.length > 0 && breakouts.length === 0) {
            return MetricMode;
        }
        if (aggregations.length > 0 && breakouts.length > 0) {
            let breakoutFields = breakouts.map(breakout => (Q.getFieldTarget(breakout, tableMetadata)||{}).field);
            console.log(isDate(breakoutFields[0]))
            console.log(isAddress(breakoutFields[0]))
            if ((breakoutFields.length === 1 && isDate(breakoutFields[0])) ||
                (breakoutFields.length === 2 && isDate(breakoutFields[0]) && isCategory(breakoutFields[1]))) {
                console.log('do we get to timeseries')
                return TimeseriesMode;
            }
            if (breakoutFields.length === 1 && isAddress(breakoutFields[0])) {
                console.log('do we get to geo?')
                return GeoMode;
            }
            if ((breakoutFields.length === 1 && isCategory(breakoutFields[0])) ||
                (breakoutFields.length === 2 && isCategory(breakoutFields[0]) && isCategory(breakoutFields[1]))) {
                console.log('do we get to pivot??')
                return PivotMode;
            }
        }
    } else if (Card.isNative(card)) {
        return NativeMode;
    }
    return DefaultMode;
}

function getAggregationName(aggregation, tableMetadata, customFields) {
    if (NamedClause.isNamed(aggregation)) {
        return NamedClause.getName(aggregation);
    } else if (AggregationClause.isCustom(aggregation)) {
        return format(aggregation, { tableMetadata, customFields });
    } else if (AggregationClause.isMetric(aggregation)) {
        const metricId = AggregationClause.getMetric(aggregation);
        const selectedMetric = _.findWhere(tableMetadata.metrics, { id: metricId });
        if (selectedMetric) {
            return selectedMetric.name;
        }
    } else {
        const fieldId = AggregationClause.getField(aggregation);
        const selectedAggregation = getAggregator(AggregationClause.getOperator(aggregation));
        if (selectedAggregation && _.findWhere(tableMetadata.aggregation_options, { short: selectedAggregation.short })) {
            return (
                selectedAggregation.name.replace(" of ...", "") +
                (fieldId ? " of FIXME" : "")
            );
        }
    }
    return null;
}

export function getMetrics(card, tableMetadata) {
    if (tableMetadata && Card.isStructured(card)) {
        const query = Card.getQuery(card);
        return Query.getAggregations(query).map(aggregation => ({
            name: getAggregationName(aggregation, tableMetadata, query.expression)
        }));
    }
    return [];
}

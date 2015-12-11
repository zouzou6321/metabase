import React, { Component, PropTypes } from "react";

import { Table, Column } from 'fixed-data-table';
import Icon from "metabase/components/Icon.jsx";
import Popover from "metabase/components/Popover.jsx";

import MetabaseAnalytics from '../lib/analytics';
import DataGrid from "metabase/lib/data_grid";
import { formatValue, capitalize } from "metabase/lib/formatting";

import _ from "underscore";
import cx from "classnames";

const QUICK_FILTERS = [
    { name: "<", value: "<" },
    { name: "=", value: "=" },
    { name: "≠", value: "!=" },
    { name: ">", value: ">" }
];

export default class QueryVisualizationTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            width: 0,
            height: 0,
            columnWidths: [],
            popover: null,
            data: null,
            rawData: null,
            contentWidths: null
        };

        _.bindAll(this, "onClosePopover", "rowGetter", "cellRenderer", "columnResized");

        this.isColumnResizing = false;
    }

    static propTypes = {
        data: PropTypes.object,
        sort: PropTypes.array,
        setSortFn: PropTypes.func,
        isCellClickableFn: PropTypes.func,
        cellClickedFn: PropTypes.func
    };

    static defaultProps = {
        maxRows: 2000,
        minColumnWidth: 75
    };

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data && newProps.data !== this.state.rawData) {
            let gridData = (newProps.pivot) ? DataGrid.pivot(newProps.data) : newProps.data;
            this.setState({
                data: gridData,
                rawData: this.props.data
            });
            if (JSON.stringify(this.state.data && this.state.data.cols) !== JSON.stringify(gridData.cols)) {
                this.setState({
                    columnWidths: gridData.cols.map(col => 0), // content cells don't wrap so this is fine
                    contentWidths: null
                });
            }
        }
    }

    image1() {
      return {
        cols: [
          { name: 'account ID'},
          { name: 'signed up'},
          { name: 'name' },
          { name: 'industry'},
          { name: 'city' },
          { name: 'state' },
          { name: 'country' },
          { name: 'timezone' },
          { name: 'usage_metric'},
        ],
        columns: ["Account ID","signed up","name","industry","city","state","country","timezone","usage_metric"  ],
        rows: [
          ["2535","12/16/2025","Sacramento Vet School","Education","Sacramento","California","USA","PST","0.3857834134"  ],
          ["2536","12/16/2025","Ads 4 Cats","Ad Tech","San Francisco","California","USA","PST","3.00541455"  ],
          ["2537","12/16/2025","Snapcat","Consumer Web","NYC","New York","USA","EST","8.486237851"  ],
          ["2538","12/16/2025","Two Old White Guys Holding Co","Finance","Omaha ","Nebraska","USA","CST","4.714871215"  ],
          ["2539","12/16/2025","Walks 4 Dogs","Dog Walking","Seattle","Washington","USA","PST","7.98222469"  ],
          ["2540","12/16/2025","Doggy Native Advertising LLC","Ad Tech","Atlanta","Georgia","USA","EST","4.104402003"  ],
          ["2541","12/16/2025","Metaboat Sailing Academy","Education","Half Moon Bay","California","USA","PST","6.263691879"  ],
          ["2542","12/16/2025","Home Economics ","Education","Portland ","Orgeon","USA","PST","7.779336182"  ],
          ["2543","12/16/2025","Place Your Products LLC","Ad Tech","Austin","Texas","USA","CST","9.057702976"  ],
          ["2544","12/16/2025","Royal Prancing Corgis","Dog Walking","London","","UK","GMT","4.098218921"  ],
          ["2545","12/16/2025","I Will Teach You to be Poor","Finance","NYC","New York","USA","EST","1.841642928"  ],
          ["2546","12/16/2025","Oak Desks and Handshakes","Finance","NYC","New York","USA","EST","8.095041207"  ],
          ["2547","12/17/2025","Forex Hustlerz","Finance","NYC","New York","USA","EST","4.28437375"  ],
          ["2548","12/17/2025","Madoff's Press Relations Agency","Ad Tech","NYC","New York","USA","EST","0.5759267875"  ],
          ["2549","12/17/2025","Cash for Cats","Finance","NYC","New York","USA","EST","1.806880537"  ],
          ["2550","12/17/2025","Spot's Day in the Sun","Dog Walking","Fresno","California","","PST","0.3490896712"  ],
          ["2551","12/17/2025","Fresno School Board","Education","Fresno","California","USA","PST","4.489397874"  ],
          ["2552","12/17/2025","Modesto School Board","Education","Modesto","California","USA","PST","9.506834922"  ],
          ["2553","12/17/2025","Reverse Annuities PS","Finance","NYC","New York","USA","EST","1.868229926"  ],
          ["2554","12/17/2025","No Ponzi Schemes here","Finance","NYC","New York","USA","EST","4.4333974"  ]
        ]
      }
    }

    image2() {
      return {
        cols: [
          { name: 'account ID'},
          { name: 'signed up'},
          { name: 'name' },
          { name: 'industry'},
          { name: 'city' },
          { name: 'state' },
          { name: 'country' },
          { name: 'timezone' },
          { name: 'usage_metric'},
          { name: 'aggressively_onboarded' },
          { name: 'onboarded_on' },
        ],
        columns: ["Account ID","signed up","name","industry","city","state","country","timezone","usage_metric","aggressively_onboarded", "onboarded_on"],
        rows: [
          [2535,"12/16/2025","Sacramento Vet School","Education","Sacramento","California","USA","PST",4.273828671,"TRUE",""  ],
          [2536,"12/16/2025","Ads 4 Cats","Ad Tech","San Francisco","California","USA","PST",3.951916388,"TRUE","12/22/2025"  ],
          [2537,"12/16/2025","Snapcat","Consumer Web","NYC","New York","USA","EST",2.154730636,"TRUE",""  ],
          [2538,"12/16/2025","Two Old White Guys Holding Co","Finance","Omaha ","Nebraska","USA","CST",9.468555752,"TRUE",""  ],
          [2539,"12/16/2025","Walks 4 Dogs","Dog Walking","Seattle","Washington","USA","PST",4.983506409,"TRUE",""  ],
          [2540,"12/16/2025","Doggy Native Advertising LLC","Ad Tech","Atlanta","Georgia","USA","EST",5.87364456,"TRUE",""  ],
          [2541,"12/16/2025","Metaboat Sailing Academy","Education","Half Moon Bay","California","USA","PST",9.80604079,"TRUE","12/22/2025"  ],
          [2542,"12/16/2025","Home Economics ","Education","Portland ","Orgeon","USA","PST",1.601927648,"TRUE","12/22/2025"  ],
          [2543,"12/16/2025","Place Your Products LLC","Ad Tech","Austin","Texas","USA","CST",6.010537844,"TRUE",""  ],
          [2544,"12/16/2025","Royal Prancing Corgis","Dog Walking","London","","UK","GMT",8.951050766,"TRUE",""  ],
          [2545,"12/16/2025","I Will Teach You to be Poor","Finance","NYC","New York","USA","EST",0.4752397492,"TRUE",""  ],
          [2546,"12/16/2025","Oak Desks and Handshakes","Finance","NYC","New York","USA","EST",3.354940644,"TRUE",""  ],
          [2547,"12/17/2025","Forex Hustlerz","Finance","NYC","New York","USA","EST",4.702762113,"TRUE",""  ],
          [2548,"12/17/2025","Madoff's Press Relations Agency","Ad Tech","NYC","New York","USA","EST",1.683754394,"TRUE",""  ],
          [2549,"12/17/2025","Cash for Cats","Finance","NYC","New York","USA","EST",9.944289699,"TRUE","12/22/2025"  ],
          [2550,"12/17/2025","Spot's Day in the Sun","Dog Walking","Fresno","California","","PST",3.20274191,"TRUE",""  ],
          [2551,"12/17/2025","Fresno School Board","Education","Fresno","California","USA","PST",5.519938952,"TRUE",""  ],
          [2552,"12/17/2025","Modesto School Board","Education","Modesto","California","USA","PST",3.008171693,"TRUE","12/22/2025"  ],
          [2553,"12/17/2025","Reverse Annuities PS","Finance","NYC","New York","USA","EST",0.6949899519,"TRUE",""  ],
          [2554,"12/17/2025","No Ponzi Schemes here","Finance","NYC","New York","USA","EST",1.540085819,"TRUE",""  ]
        ]
      }
    }

    image3() {
        return {
          cols: [
            {name: 'Industry / aggressively_onboarded'},
            {name: 'yes'},
            {name: 'no'},
          ],
          columns: ['Industry / aggressively_onboarded', 'Yes', 'No'],
          rows: [
            ['Education', 1, 300],
            ['Ad Tech', 8, 80,],
            ['Finance', 20, 200],
            ['Consumer Web', 10, 208],
            ['Dog Walking', 61, 112],
          ]
        }
    }

    image4() {
        return {
          cols: [
            {name: 'Status / aggressively_onboarded'},
            {name: 'yes'},
            {name: 'no'},
          ],
          columns: ['Timezone / status', 'Yes', 'No'],
          rows: [
            ['trial', 0, 0],
            ['paid', 92, 800,],
            ['unsubscribed', 8, 100],
            ['Total', 100, 900],
          ]
        }
    }

    image5() {
        return {
          cols: [
            {name: 'Timezone / status'},
            {name: 'trial'},
            {name: 'paid'},
            {name: 'unsubscribed'},
          ],
          columns: ['Timezone / status', 'trial', 'paid', 'unsubscribed'],
          rows: [
            ['EST', 0, 0, 42],
            ['CMT', 0, 10, 2],
            ['PST', 0, 35, 10],
            ['', '', 85, 14],
          ]
        }
    }

    componentDidMount() {
        this.calculateSizing(this.state);
        this.setState({
          data: this.image4()
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this is required because we don't pass in the containing element size as a property :-/
        // if size changes don't update yet because state will change in a moment
        this.calculateSizing(nextState);

        // compare props and state to determine if we should re-render
        // NOTE: this is essentially the same as React.addons.PureRenderMixin but
        // we currently need to recalculate the container size here.
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }

    componentDidUpdate() {
        if (!this.state.contentWidths) {
            let tableElement = React.findDOMNode(this.refs.table);
            let contentWidths = [];
            let rowElements = tableElement.querySelectorAll(".fixedDataTableRowLayout_rowWrapper");
            for (var rowIndex = 0; rowIndex < rowElements.length; rowIndex++) {
                let cellElements = rowElements[rowIndex].querySelectorAll(".public_fixedDataTableCell_cellContent");
                for (var cellIndex = 0; cellIndex < cellElements.length; cellIndex++) {
                    contentWidths[cellIndex] = Math.max(contentWidths[cellIndex] || 0, cellElements[cellIndex].offsetWidth);
                }
            }
            this.setState({ contentWidths }, () => this.calculateColumnWidths(this.state.data.cols));
        }
    }

    calculateColumnWidths(cols) {
        let columnWidths = cols.map((col, index) => {
            if (this.state.contentWidths) {
                return Math.min(this.state.contentWidths[index] + 1, 300); // + 1 to make sure it doen't wrap?
            } else {
                return 300;
            }
        });
        this.setState({ columnWidths });
    }

    calculateSizing(prevState, force) {
        var element = React.findDOMNode(this);

        // account for padding of our parent
        var style = window.getComputedStyle(element.parentElement, null);
        var paddingTop = Math.ceil(parseFloat(style.getPropertyValue("padding-top")));
        var paddingLeft = Math.ceil(parseFloat(style.getPropertyValue("padding-left")));
        var paddingRight = Math.ceil(parseFloat(style.getPropertyValue("padding-right")));

        var width = element.parentElement.offsetWidth - paddingLeft - paddingRight;
        var height = element.parentElement.offsetHeight - paddingTop;

        if (width !== prevState.width || height !== prevState.height || force) {
            this.setState({ width, height });
        }
    }

    isSortable() {
        return (this.props.setSortFn !== undefined);
    }

    setSort(fieldId) {
        this.props.setSortFn(fieldId);

        MetabaseAnalytics.trackEvent('QueryBuilder', 'Set Sort', 'table column');
    }

    cellClicked(rowIndex, columnIndex) {
        this.props.cellClickedFn(rowIndex, columnIndex);
    }

    popoverFilterClicked(rowIndex, columnIndex, operator) {
        this.props.cellClickedFn(rowIndex, columnIndex, operator);
        this.setState({ popover: null });
    }

    rowGetter(rowIndex) {
        var row = {
            hasPopover: this.state.popover && this.state.popover.rowIndex === rowIndex || false
        };
        for (var i = 0; i < this.state.data.rows[rowIndex].length; i++) {
            row[i] = this.state.data.rows[rowIndex][i];
        }
        return row;
    }

    showPopover(rowIndex, cellDataKey) {
        this.setState({
            popover: {
                rowIndex: rowIndex,
                cellDataKey: cellDataKey
            }
        });
    }

    onClosePopover() {
        this.setState({ popover: null });
    }

    cellRenderer(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
        cellData = cellData != null ? formatValue(cellData, this.props.data.cols[cellDataKey]) : null;

        var key = 'cl'+rowIndex+'_'+cellDataKey;
        if (this.props.cellIsClickableFn(rowIndex, cellDataKey)) {
            return (
                <a key={key} className="link cellData" href="#" onClick={this.cellClicked.bind(this, rowIndex, cellDataKey)}>{cellData}</a>
            );
        } else {
            var popover = null;
            if (this.state.popover && this.state.popover.rowIndex === rowIndex && this.state.popover.cellDataKey === cellDataKey) {
                popover = (
                    <Popover
                        hasArrow={false}
                        tetherOptions={{
                            targetAttachment: "middle center",
                            attachment: "middle center"
                        }}
                        onClose={this.onClosePopover}
                    >
                        <div className="bg-white bordered shadowed p1">
                            <ul className="h1 flex align-center">
                                { QUICK_FILTERS.map(({ name, value }) =>
                                    <li key={value} className="p2 text-brand-hover" onClick={this.popoverFilterClicked.bind(this, rowIndex, cellDataKey, value)}>{name}</li>
                                )}
                            </ul>
                        </div>
                    </Popover>
                );
            }
            return (
                <div key={key} onClick={this.showPopover.bind(this, rowIndex, cellDataKey)}>
                    <span className="cellData">{cellData}</span>
                    {popover}
                </div>
            );
        }
    }

    columnResized(width, idx) {
        var tableColumnWidths = this.state.columnWidths.slice();
        tableColumnWidths[idx] = width;
        this.setState({
            columnWidths: tableColumnWidths
        });
        this.isColumnResizing = false;
    }

    tableHeaderRenderer(columnIndex) {
        var column = this.state.data.cols[columnIndex],
            colVal = (column && column.display_name && column.display_name.toString()) ||
                     (column && column.name && column.name.toString());

        if (column.unit) {
            colVal += ": " + capitalize(column.unit.replace(/-/g, " "))
        }

        if (!colVal && this.props.pivot && columnIndex !== 0) {
            colVal = "Unset";
        }

        var headerClasses = cx('MB-DataTable-header cellData align-center', {
            'MB-DataTable-header--sorted': (this.props.sort && (this.props.sort[0][0] === column.id)),
        });

        // set the initial state of the sorting indicator chevron
        var sortChevron = (<Icon name="chevrondown" width="8px" height="8px"></Icon>);

        if(this.props.sort && this.props.sort[0][1] === 'ascending') {
            sortChevron = (<Icon name="chevronup" width="8px" height="8px"></Icon>);
        }

        if (this.isSortable()) {
            // ICK.  this is hacky for dealing with aggregations.  need something better
            var fieldId = (column.id) ? column.id : "agg";

            return (
                <div key={columnIndex} className={headerClasses} onClick={this.setSort.bind(this, fieldId)}>
                    <span>
                        {colVal}
                    </span>
                    <span className="ml1">
                        {sortChevron}
                    </span>
                </div>
            );
        } else {
            return (
                <span className={headerClasses}>
                    {colVal}
                </span>
            );
        }
    }

    render() {
        if(!this.state.data) {
            return false;
        }

        var tableColumns = this.state.data.cols.map((column, idx) => {
            var colVal = (column !== null) ? column.name.toString() : null;
            var colWidth = this.state.columnWidths[idx];

            if (!colWidth) {
                colWidth = 75;
            }

            return (
                <Column
                    key={'col_' + idx}
                    className="MB-DataTable-column"
                    width={colWidth}
                    isResizable={true}
                    headerRenderer={this.tableHeaderRenderer.bind(this, idx)}
                    cellRenderer={this.cellRenderer}
                    dataKey={idx}
                    label={colVal}>
                </Column>
            );
        });

        return (
            <span className={cx('MB-DataTable', { 'MB-DataTable--pivot': this.props.pivot, 'MB-DataTable--ready': this.state.contentWidths })}>
                <Table
                    ref="table"
                    rowHeight={35}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.data.rows.length}
                    width={this.state.width}
                    height={this.state.height}
                    headerHeight={50}
                    isColumnResizing={this.isColumnResizing}
                    onColumnResizeEndCallback={this.columnResized}
                    allowCellsRecycling={true}
                >
                    {tableColumns}
                </Table>
            </span>
        );
    }
}

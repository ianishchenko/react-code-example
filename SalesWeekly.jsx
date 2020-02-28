import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

import DataTable from 'Components/DataTable';

import { SalesWeeklyType } from './types';
import useColumnsWeekly from './reactTableHooks/useColumnsWeekly';

import styles from './styles';

function translate(id) {
    return <FormattedMessage id={`dashboard.widgets.md.sales.${id}`} />;
}
const header = (
    <>
        <b>{translate('title')}</b>&nbsp;
        <FormattedMessage id="dashboard.widgets.md.weekly" />
    </>
);

function SalesWeekly({ classes, data: { phoneCalls = {}, appointments = {}, requests = {}, tivs = {}, deals = {}, averageFeedbackTime = {} } }) {
    const columns = useColumnsWeekly('sales_weekly');
    const tableData = useMemo(
        () => [
            { title: translate('phone_calls'), ...phoneCalls },
            { title: translate('appointments'), ...appointments },
            { title: translate('requests'), ...requests },
            { title: translate('tivs'), ...tivs },
            { title: translate('deals'), ...deals },
            { title: translate('average_feedback_time'), ...averageFeedbackTime }
        ],
        [phoneCalls, appointments, requests, tivs, deals, averageFeedbackTime]
    );

    return (
        <div className={classes.mdBlock}>
            <h3 className={classes.mdBlockTitle}>{header}</h3>
            <DataTable
                className="rt-table-responsive"
                reactTableProps={{ sortable: false, showPagination: false, resizable: false }}
                highlight={false}
                loadOnMount={false}
                columns={columns}
                data={tableData}
                withFilters={false}
            />
        </div>
    );
}

SalesWeekly.propTypes = {
    data: SalesWeeklyType,
    classes: PropTypes.object.isRequired
};
SalesWeekly.defaultProps = {
    data: {}
};

const enhance = compose(
    withStyles(styles),
    memo
);

export default enhance(SalesWeekly);

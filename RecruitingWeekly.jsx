import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

import DataTable from 'Components/DataTable';

import { RecruitingWeeklyType } from './types';
import useColumnsWeekly from './reactTableHooks/useColumnsWeekly';

import styles from './styles';

function translate(id) {
    return <FormattedMessage id={`dashboard.widgets.md.recruiting.${id}`} />;
}
const header = (
    <>
        <b>{translate('title')}</b>&nbsp;
        <FormattedMessage id="dashboard.widgets.md.weekly" />
    </>
);

function RecruitingWeekly({
    classes,
    data: { phoneCalls = {}, emails = {}, requests = {}, tivs = {}, deals = {}, averageProcessingTime = {}, cvsShipped = {} }
}) {
    const columns = useColumnsWeekly('recruiting_weekly');
    const tableData = useMemo(
        () => [
            { title: translate('phone_calls'), ...phoneCalls },
            { title: translate('documented_mails'), ...emails },
            { title: translate('requests'), ...requests },
            { title: translate('cvs_shipped'), ...cvsShipped },
            { title: translate('tivs'), ...tivs },
            { title: translate('deals'), ...deals },
            { title: translate('average_processing_time'), ...averageProcessingTime }
        ],
        [phoneCalls, cvsShipped, emails, requests, tivs, deals, averageProcessingTime]
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

RecruitingWeekly.propTypes = {
    data: RecruitingWeeklyType,
    classes: PropTypes.object.isRequired
};
RecruitingWeekly.defaultProps = {
    data: {}
};

const enhance = compose(
    withStyles(styles),
    memo
);

export default enhance(RecruitingWeekly);

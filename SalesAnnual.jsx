import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

import DataTable from 'Components/DataTable';

import { SalesAnnualType } from './types';
import useColumnsAnnual from './reactTableHooks/useColumnsAnnual';

import styles from './styles';

function translate(id) {
    return <FormattedMessage id={`dashboard.widgets.md.sales.${id}`} />;
}
const header = (
    <>
        <b>{translate('title')}</b>&nbsp;
        <FormattedMessage id="dashboard.widgets.md.annual" />
    </>
);

function SalesAnnual({ classes, data: { deals = {}, realDeals = {} } }) {
    const columns = useColumnsAnnual('recruiting_annual');
    const tableData = useMemo(() => [{ title: translate('deals_annual'), ...deals }, { title: translate('real_deals'), ...realDeals }], [deals, realDeals]);

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

SalesAnnual.propTypes = {
    data: SalesAnnualType,
    classes: PropTypes.object.isRequired
};
SalesAnnual.defaultProps = {
    data: {}
};

const enhance = compose(
    withStyles(styles),
    memo
);

export default enhance(SalesAnnual);

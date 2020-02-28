import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

import DataTable from 'Components/DataTable';

import { CssWeeklyType } from './types';
import useColumnsWeekly from './reactTableHooks/useColumnsWeekly';

import styles from './styles';

function translate(id) {
    return <FormattedMessage id={`dashboard.widgets.md.css.${id}`} />;
}
const header = (
    <>
        <b>{translate('title')}</b>&nbsp;
        <FormattedMessage id="dashboard.widgets.md.weekly" />
    </>
);

function CssWeekly({ classes, data: { cvsEdited = {}, newPlant = {}, averageCVEditingTime = {} } }) {
    const columns = useColumnsWeekly('css_weekly');

    const tableData = useMemo(
        () => [
            { title: translate('cvs_edited'), ...cvsEdited },
            { title: translate('average_cv_editing_time'), ...averageCVEditingTime },
            { title: translate('new_plant'), ...newPlant }
        ],
        [cvsEdited, newPlant, averageCVEditingTime]
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

CssWeekly.propTypes = {
    data: CssWeeklyType,
    classes: PropTypes.object.isRequired
};
CssWeekly.defaultProps = {
    data: {}
};

const enhance = compose(
    withStyles(styles),
    memo
);

export default enhance(CssWeekly);

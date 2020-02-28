import React, { memo, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import Card from 'Components/CustomCard/CustomCard';
import { dataByKeySelector, loadingByKeySelector, filterByKeySelector } from 'Selectors/asyncData';
import { ASYNC_DATA_MD_WIDGET, loadUserStatistic as loadAction, updateFilter as updateFilterAction } from 'Actions/widget';
import { resetStore as resetAction } from 'Actions/asyncData';
import { USER_STATISTIC_TYPES } from 'Constants/widgets';
import WidgetTitle from 'Components/Widgets/WidgetTitle/WidgetTitle';
import { checkFunction } from 'Utils';
import Loader from 'Components/Loader';
import styles from 'Layouts/Dashboard/styles';
import useDeepCompareEffect from 'Hooks/DeepCompare/useDeepCompareEffect';
import useDeepCompareMemo from 'Hooks/DeepCompare/useDeepCompareMemo';
import { useBlinesAndFunctionsInfo } from 'Hooks/dashboard';
import { USER_FUNCTIONS } from 'Constants';

// parts of widget based on role
import CssWeekly from './CssWeekly';
import RecruitingWeekly from './RecruitingWeekly';
import RecruitingAnnual from './RecruitingAnnual';
import SalesWeekly from './SalesWeekly';
import SalesAnnual from './SalesAnnual';
import Filter from './Filter';
import { MDType } from './types';

function MD({
    loading,
    classes,
    isOpenHandler,
    isOpen,
    loadData,
    bline,
    roleFunction,
    userId,
    data: { salesWeekly = {}, salesAnnual = {}, recruiterWeekly = {}, recruiterAnnual = {}, cssWeekly = {} },
    reset,
    filter,
    updateFilter
}) {
    // use custom deep compare hook for correct objects comparison
    useDeepCompareEffect(
        () => {
            // load data if widget is open
            if (isOpen) {
                // load data by specific user and filter
                loadData(userId, USER_STATISTIC_TYPES.MD, { bline, ...filter.where });
            }
        },
        [loadData, bline, userId, isOpen, filter.where]
    );
    // reset on unmount
    useEffect(() => () => reset(), [reset]);

    const [selectedUser, setUser] = useState(null);

    // check ACL
    const activeRoles = useMemo(() => (selectedUser ? selectedUser.activeRoles : []), [selectedUser]);
    const { uniqueFunctions } = useBlinesAndFunctionsInfo(activeRoles);

    let showSalesBlock = true;
    let showRecruiterBlock = true;
    let showCssBlock = true;

    if (selectedUser) {
        showSalesBlock = uniqueFunctions.some(func => func === USER_FUNCTIONS.ACCOUNT_MANAGER_TEAM_LEAD);
        showRecruiterBlock = uniqueFunctions.some(func => func === USER_FUNCTIONS.RECRUITER_TEAM_LEAD);
        showCssBlock = uniqueFunctions.some(func => func === USER_FUNCTIONS.CSS_TEAM_LEAD);
    }

    const { isSuperAdmin } = checkFunction(roleFunction);
    const headerTitle = useDeepCompareMemo(() => <WidgetTitle messageId="dashboard.widgets.md.title" bline={bline} />, [bline]);

    return (
        <Card
            canCollapse
            collapseButtonColor="primary"
            collapseButtonPosition="left"
            isOpenHandler={isOpenHandler}
            className={classes.skillsDemandCard}
            isOpen={isOpen}
            headerTitle={headerTitle}
        >
            {loading && <Loader />}
            {isSuperAdmin ? (
                <>
                    <Filter reset={reset} filter={filter} updateFilter={updateFilter} setUser={setUser} />
                    {showSalesBlock && (
                        <>
                            <SalesWeekly data={salesWeekly} />
                            <SalesAnnual data={salesAnnual} />
                        </>
                    )}
                    {showRecruiterBlock && (
                        <>
                            <RecruitingWeekly data={recruiterWeekly} />
                            <RecruitingAnnual data={recruiterAnnual} />
                        </>
                    )}
                    {showCssBlock && <CssWeekly data={cssWeekly} />}
                </>
            ) : (
                <FormattedMessage id="widgets.no_data" />
            )}
        </Card>
    );
}

MD.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    loading: PropTypes.bool,
    isOpenHandler: PropTypes.func,
    updateFilter: PropTypes.func,
    loadData: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    bline: PropTypes.object,
    filter: PropTypes.object,
    roleFunction: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    data: MDType
};
MD.defaultProps = {
    isOpen: true,
    loading: false,
    isOpenHandler: () => {},
    updateFilter: () => {},
    bline: {},
    filter: {},
    data: {}
};

// use compose to prevent decorators hell
const enhance = compose(
    withStyles(styles),
    // use redux and selectors
    connect(
        store => ({
            data: dataByKeySelector(store, ASYNC_DATA_MD_WIDGET),
            loading: loadingByKeySelector(store, ASYNC_DATA_MD_WIDGET),
            filter: filterByKeySelector(store, ASYNC_DATA_MD_WIDGET)
        }),
        dispatch => ({
            loadData: (id, type, data) => dispatch(loadAction(ASYNC_DATA_MD_WIDGET, { id, type, data })),
            updateFilter: filter => dispatch(updateFilterAction(ASYNC_DATA_MD_WIDGET, filter)),
            reset: () => dispatch(resetAction(ASYNC_DATA_MD_WIDGET))
        })
    ),
    memo
);

export default enhance(MD);

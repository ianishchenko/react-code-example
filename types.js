import PropTypes from 'prop-types';

const SalesWeeklyType = PropTypes.shape({
    phoneCalls: PropTypes.object,
    appointments: PropTypes.object,
    requests: PropTypes.object,
    tivs: PropTypes.object,
    deals: PropTypes.object,
    averageFeedbackTime: PropTypes.object
});
const SalesAnnualType = PropTypes.shape({
    deals: PropTypes.object,
    realDeals: PropTypes.object
});

const RecruitingWeeklyType = PropTypes.shape({
    phoneCalls: PropTypes.object,
    emails: PropTypes.object,
    requests: PropTypes.object,
    cvsShipped: PropTypes.object,
    tivs: PropTypes.object,
    deals: PropTypes.object,
    averageProcessingTime: PropTypes.object
});
const RecruitingAnnualType = PropTypes.shape({
    deals: PropTypes.object
});

const CssWeeklyType = PropTypes.shape({
    cvsEdited: PropTypes.object,
    newPlant: PropTypes.object,
    averageCVEditingTime: PropTypes.object
});

const MDType = PropTypes.shape({
    salesWeekly: SalesWeeklyType,
    salesAnnual: SalesWeeklyType,
    recruitingWeekly: SalesWeeklyType,
    recruitingAnnual: SalesWeeklyType,
    cssWeekly: SalesWeeklyType
});

export { MDType, SalesAnnualType, SalesWeeklyType, CssWeeklyType, RecruitingAnnualType, RecruitingWeeklyType };

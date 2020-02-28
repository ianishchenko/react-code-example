import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'seamless-immutable';

import GridContainer from 'Theme/Grid/GridContainer';
import GridItem from 'Components/CustomGridItem/CustomGridItem';
import { AUTO_COMPLETE_USERS } from 'Actions/autoComplete';
import { USER_TEAM_LEAD_FUNCTIONS } from 'Constants';
import { userLabelSelector, userGetBuildQuery, userDefaultFilter, userValueSelector } from 'ApiFilterScopes';
import { Filter } from 'Components/DataTable';
import { SelectWithAutoComplete, UserOfficeSelect } from 'Components/CustomSelect';

const defaultFilter = {
    ...userDefaultFilter,
    whereHas: { activeRoles: { where: { role_function: { inq: USER_TEAM_LEAD_FUNCTIONS } } } },
    include: ['activeRoles']
};

const buildQuery = userGetBuildQuery(defaultFilter);

function FilterForm({ reset, filter, updateFilter, setUser }) {
    const [defaultUserFilter, setDefaultUserFilter] = useState(defaultFilter);

    const onChangeOffice = useCallback(
        value => {
            updateFilter({ where: { office: value } });

            if (value) {
                setDefaultUserFilter(Immutable.merge(defaultFilter, { where: { office: value } }));
            } else {
                const newFilter = { ...defaultFilter };

                delete newFilter.where.office;

                setDefaultUserFilter(newFilter);
            }
        },
        [updateFilter, setDefaultUserFilter]
    );

    const onChangeUser = useCallback(
        (value, user) => {
            setUser(user);
        },
        [setUser]
    );

    return (
        <Filter collapsedFilters resetBlockSticky filter={filter} reset={reset} updateFilter={updateFilter}>
            {({ resetButton, handleInputChangeWithWhere, getValueByName }) => (
                <form>
                    {resetButton}
                    <GridContainer size="small">
                        <GridItem xs={12} md={4} lg={3}>
                            <UserOfficeSelect
                                isClearable
                                id="office"
                                customChange={onChangeOffice}
                                labelText={<FormattedMessage id="field.office.label" />}
                                value={getValueByName('office')}
                                onChange={handleInputChangeWithWhere}
                            />
                        </GridItem>
                        <GridItem xs={12} md={4} lg={3}>
                            <SelectWithAutoComplete
                                withUpdateOnDefaultFilterChange
                                id="user_id"
                                buildQuery={buildQuery}
                                valueSelector={userValueSelector}
                                value={getValueByName('user_id')}
                                customChange={onChangeUser}
                                labelSelector={userLabelSelector}
                                api={AUTO_COMPLETE_USERS}
                                defaultFilter={defaultUserFilter}
                                onChange={handleInputChangeWithWhere}
                                labelText={<FormattedMessage id="user.team_lead.title" />}
                            />
                        </GridItem>
                    </GridContainer>
                </form>
            )}
        </Filter>
    );
}

FilterForm.propTypes = {
    reset: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    filter: PropTypes.object
};

FilterForm.defaultProps = { filter: {} };

export default memo(FilterForm);

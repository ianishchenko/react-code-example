/**
 * Column configuration for weekly period
 */

import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import { cellMobileWrapper } from 'Components/DataTable/DataTableCells';

const Cell = header => ({ value }) => cellMobileWrapper(header, value);

const firstColumnHeader = <FormattedMessage id="dashboard.widgets.md.indicators" />;

function useColumnsWeekly(entity) {
    const weeks = useMemo(() => {
        const result = [];

        // minus 6 weeks start of now
        for (let i = 5; i >= 0; i -= 1) {
            result.push(
                moment()
                    .subtract(i, 'weeks')
                    .week()
            );
        }

        return result;
    }, []);

    return useMemo(
        () => [
            { id: `${entity}_identifier`, accessor: 'title', Header: firstColumnHeader, Cell: Cell(firstColumnHeader) },
            ...weeks.map(week => ({ id: `${entity}_W${week}`, accessor: `${week}`, Header: `W${week}`, Cell: Cell(`W${week}`) }))
        ],
        [weeks, entity]
    );
}

export default useColumnsWeekly;

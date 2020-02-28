/**
 * Column configuration for annual period
 */

import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import { cellMobileWrapper } from 'Components/DataTable/DataTableCells';

const Cell = header => ({ value }) => cellMobileWrapper(header, value);

const firstColumnHeader = <FormattedMessage id="dashboard.widgets.md.indicators" />;
const translate = month => <FormattedMessage id={`general.month.short.${month}`} />;

function useColumnsAnnual(entity) {
    const months = useMemo(() => {
        const result = [];

        // minus 13 months start of now
        for (let i = 12; i >= 0; i -= 1) {
            result.push({
                month: moment()
                    .subtract(i, 'months')
                    .month(),
                date: moment()
                    .subtract(i, 'months')
                    .format('YYYY-MM')
            });
        }

        return result;
    }, []);

    return useMemo(
        () => [
            { id: `${entity}_identifier`, accessor: 'title', Header: firstColumnHeader, Cell: Cell(firstColumnHeader) },
            ...months.map(({ month, date }) => ({
                id: `${entity}_${date}`,
                accessor: `${date}`,
                Header: translate(month),
                Cell: Cell(translate(month))
            }))
        ],
        [months, entity]
    );
}

export default useColumnsAnnual;

# React code example

## We use

- react
- material-ui
- react-table
- react-intl
- Redux
- Reselect
- Redux-thunk
- Seamless-immutable

## Quick description

It's a widget for represent statistic for particular user.   
We use deep compare hooks for compare objects/arrays in right way.

`index.jsx` - the entry point. Here we load a data from the server and distribute it to another components.  
We use custom query builder on API to make getting data more easier so we use custom builder there to make it in the right way.  

`Filter.js` - the component in which we form filter object. It uses render props to reuse some specific similar logic of forming filter and similar view.

`RecruitingAnnual.jsx.jsx`, `RecruitingWeekly.jsx`, `SalesAnnual.jsx`, `SalesWeekly.jsx`, `CssWeekly.jsx` - parts of the representation data bases on user role.  
This files use wrapper on react-table.  

`reactTableHooks` - the directory with hooks that contains similar logic to form columns configuration in all tables.  

`types.js` - the file with prop-types that describes shape of a data from the server.



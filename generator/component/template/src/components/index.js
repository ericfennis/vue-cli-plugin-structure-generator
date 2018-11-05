---
extend: indexFilePath
replace: !!js/regexp /export {/
---
<%# REPLACE %>
  export {
  <%= name %>
<%# END_REPLACE %>
# UnKnow

这里主要放一些还没理解的代码

1. `mixins/reset-filter`
    
    
    // Reset filters for IE
    //
    // When you need to remove a gradient background, do not forget to use this to reset
    // the IE filter for IE9 and below.

    .reset-filter() {
      filter: e(%("progid:DXImageTransform.Microsoft.gradient(enabled = false)"));
    }

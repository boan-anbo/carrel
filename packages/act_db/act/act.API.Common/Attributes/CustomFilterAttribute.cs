﻿using Microsoft.AspNetCore.Mvc.Filters;

namespace act.API.Common.Attributes;

public class CustomFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext actionContext)
    {
        //TODO: actions to implement
    }
}
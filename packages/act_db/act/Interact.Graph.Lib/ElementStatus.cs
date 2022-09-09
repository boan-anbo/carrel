namespace InteractGraphLib;

public class ElementStatus
{
    public ElementStatus()
    {
        Selected = false;
        Hover = false;
        Active = false;
        Disabled = false;
    }

    /// <summary>
    /// 是否选中
    /// </summary>
    public bool? Selected { get; set; }

    /// <summary>
    /// 是否Hover
    /// </summary>
    public bool? Hover { get; set; }

    /// <summary>
    /// 是否激活
    /// </summary>
    public bool? Active { get; set; }

    /// <summary>
    /// 是否禁用
    /// </summary>
    public bool? Disabled { get; set; }

    /// <summary>
    /// 用户自定义的状态
    /// </summary>
    public Dictionary<string, bool> CustomStatus { get; set; } = new Dictionary<string, bool>();
}
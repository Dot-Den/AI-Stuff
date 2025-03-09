namespace AIReportingAPI.Models.SharePointData;

public class SharePointList
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string InternalName { get; set; } = "";
    public string Description { get; set; } = "";

    public string DefaultViewUrl { get; set; } = "";
    public string DefaultDisplayFormUrl { get; set; } = "";
    public string DefaultNewFormUrl { get; set; } = "";
    public string DefaultEditFormUrl { get; set; } = "";

    public DateTime Created { get; set; }
}

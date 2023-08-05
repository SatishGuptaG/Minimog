declare var $;
declare var dhx;
//import { BaseRestService, StringParams } from "./BaseRestService";
export interface StringParams {
    [key: string]: string
}

export abstract class BaseRestService {
    protected get<T>(url: string, params: StringParams, callback?: (res: T) => void): void {
        this.query(url, params, "GET", null, callback);
    }

    protected del<T>(url: string, params: StringParams, callback?: (res: T) => void): void {
        this.query(url, params, "DELETE", null, callback);
    }

    protected put<T>(url: string, urlParams: StringParams, body?: any, callback?: (res: T) => void): void {
        this.query(url, urlParams, "GET", body, callback);
    }

    protected post<T>(url: string, params: StringParams, body?: any, callback?: (res: T) => void): void {
        this.query(url, params, "POST", body, callback);
    }

    private query<T>(url: string, params: StringParams, method: string, data: any, callback?: (res: T) => void): void {
        const finalUrl = this.appendUrlParams(url, params);
        const ajaxParams = {
            url: finalUrl,
            method: method,
            success: x => callback && callback(x)
        };
        if (data) {
            ajaxParams["data"] = data;
        }
        $.ajax(ajaxParams);
    }

    private appendUrlParams(baseUrl: string, params: StringParams): string {
        if (!params)
            return baseUrl;
        for (let a in params) {
            let delimeter: string;
            if (baseUrl.indexOf("?") > -1) {
                delimeter = "&";
            } else {
                delimeter = "?";
            }
            if (baseUrl[baseUrl.length - 1] !== delimeter) {
                baseUrl += delimeter;
            }
            baseUrl += `${encodeURIComponent(a)}=${encodeURIComponent(params[a])}`;
        }
        return baseUrl;
    }
}

//type GroupType = "none" | "brand" | "category" | "collection";
enum GroupType {
    None = 0,
    Brand = 1,
    Category = 2,
    Collection = 3
};//= "none" | "brand" | "category" | "collection";

enum FieldGroupType {
    None = 0,
    BasicInfo,
    Description,
    Media,
    SeoInfo,
    Category,
    Collections,
    Pricing,
    Identifiers,
    Dimensions,
    Shipping,
    GiftWrap,
    Brands,
    Purchasibilty,
    Domains
}

enum HeaderToolBar {
    None = 0,
    CataLogue,
    Orders
}

enum TreeToolBarEvents {
    None = 0,
    TreeRefresh,
    TreeCollapseAll,
    TreeExpandAll
}

enum DataListToolBarEvents {
    None = 0,
    LightView,
    LargeView,
    ListRefresh,
    Filter,
    FilterShowAll,
    FilterHideAll,
    FilterReset,
    GridExport,
    PrintGrid,
    SelectAll,
    Delivery,
    Prices,
    SEOInfo
}

enum DetailListToolBarEvents {
    None = 0,
    GridBasicInfo,
    GridDescription,
    GridMedia,
    GridSEO,
    GridRefresh,
    GridSave,
    UploadMedia,
    UploadVideoMedia,
    GridIdentifiers,
    GridCategory,
    GridPricing,
    GridDimensions,
    GridShipping,
    GridCollections,
    GridGiftWrap,
    GridBrands,
    GridPurchasibilty,
    GridDomains
}

enum ItemTypes {
    Product = 1,
    //Service = 2,
    // RentalAsset = 3,
    GiftCard = 4,
    GiftBox = 189,
    GiftBoxLine = 202,
    //Variant = 6,
    //Virtual = 5,
    Bundle = 7,
    DynamicBundle = 8,
    Addon = 10
}

enum ShippingMethodTypes {
    None = 0,
    Standard = 1,
    Express = 2,
    Nominated = 3,
    Pickup = 4,
    //CollectPlus = 5,
    //Shutl = 6,
}

enum PurchasabilityType {
    OnlineStore = 1,
    PreOrder,
    ForwardOrder
}

enum GiftWrapSettings {
    DoNotAllowGW = 0,
    AllowGWAll,
    SelectedGW
}

enum GiftWrapTypes {
    None = 0,
    WholeOrder = 1,
    LineItems = 2
}

enum OrdersFilterToolbar {
    AllOrders = 1,
    SaveFiltersInView
}

enum OrderGroupTypes {
    None = 0,
    OrderStatus = 1,
    OrderPeriod = 2
}

enum DetailGridOrderToolbarEvents {
    Products = 1,
    History,
    OrderProducts,
    Messages,
    Refresh,
    Save,
    Excel,
    BasicInfo,
    UpdateOrderPayment,
    UpdateOrderStatus
}

enum OrderFieldGroup {
    //Order Tab Feilds
    None = 0,
    Products,
    History,
    OrderProducts,
    Messages,
    Refresh,
    Save,
    Excel,
    BasicInfo
}

enum MassUpdaterType {
    Product = 0,
    Order = 1
}

enum PaymentStatus {

    Pending = 0,
    Authorized = 1,
    Paid = 2,
    Declined = 3,
    Cancelled = 4,
    CancelledByPSP = 5,
    Refunded = 6,
    Charging = 7,
    Voided = 8,
    RequirePreAuth = 9,
    ProblemInRefund = 10,
    ProblemInPostAuth = 11,
    AwaitingPostAuthResponse = 12,
    RequestToCancelPreAuth = 13,
    ProblemInCancelPreAuth = 14,
    PoReceived = 15,
}

enum OrderStatus {
    //Unknown = 0,        
    Incomplete = 1,
    PreOrderUntrusted = 10,
    Processing = 20,
    Complete = 30,
    Cancelled = 40,
    Pending = 2,
    Approved = 3,
    SentToWarehose = 4,
    AcceptedInWarehouse = 5,
    OrderSettled = 7,
    Dispatch = 9,
    ReadyToDispatch = 12,
    Accepted = 21,
    Create = 22,
    IDREQUIRED = 107,
    AwaitingSettlement = 6,
    PreOrderApproved = 11,
    CancelledByStore = 102,
    CancelledByStorePaymentIssue = 103,
    CancelledByStoreStockIssue = 104,
    CancelledByCustomer = 105,
    CancelledFailedFraudScreening = 110,
    //Order Status for Order confirmation in OMS
    FailedInOMS = 200,
    New = 201,
    CancelledByLapsedJob = 202,
    AwaitingTracking = 205,
    Void = 206
}

enum PaymentTypeOffLine {
    Bacs = 0,
    Cheque = 1,
    Cash = 2,
    Card = 3,
    Foc = 4,
    Moto = 5,
    AccountCredit = 8
}

enum PaymentStatusOffline {

    Pending = 0,
    Authorized = 1,
    Paid = 2,
    Declined = 3
}

enum OrderType {
    Standard = 0,
    SubscriptionSeedOrder = 1,
    PreOrder = 3,
    GiftCardPhysical = 4,
    SubscriptionFulfilmentOrder = 5,
    EngravingOrders = 6,
    ReplacementOrders = 7,
    GiftCardVirtual = 8,
    ForwardSalesOrder = 9,
    GiftCardVirtualUpFront = 10,
    SplitOrder = 11
}

export interface TreeItem {
    Id: string;
    Type: GroupType;
    Text: string;
    Items?: TreeItem[];
}

export class BatchUpdateService extends BaseRestService {

    loadTree(callback: (entries: TreeItem[]) => void, prefix?: string): void {
        let params = {};
        if (prefix) {
            params = {
                prefix
            };
        }
        this.get<{ Data: TreeItem[] }>('/api/Blob/List', params, x => callback(x.Data));
    }
    /*
    move(from: string, to: string, callback?: () => void): void {
        this.put('/api/Blob/Move', { from, to }, () => callback && callback());
    }*/
}

export class PageManager extends BaseRestService {
    private groupTree;
    private layoutContainer;
    private dataView;
    private dataGrid;
    private editForm;
    private toolBarTree;
    private toolBarDataGrid;
    private toolBarDetailGrid;
    private toolBarOrderDetailGrid;
    private richTextLong;
    private richTextShort;
    private listContainer;
    private detailGrid;
    private uploader;
    private window;
    private treeGrid;
    private childGrid;
    private headerToolBar;
    private copyGrid;

    GetData(url: string, params: any, callback: (x: object) => void): void {
        this.get<object>(url, params, x => callback(x));
    }

    PostData(url: string, params: any, body: any, callback: (x: object) => void): void {
        this.post<object>(url, params, body, x => callback(x));
    }

    async run() {
        const thisComponent = this;
        let url: string = $("#pimUriHidden").val().slice(1, -1) + 'MassUpdater/';
        let massUpdaterType: string = $("#massUpdaterTypeHidden").val();

        let selectedGridData = [];
        let selectedDetailGridData = [];
        let selectedDetailGridRecord = [];
        let selectedVideoGridRecord = [];
        let componentType = { type: 1 };   // 1 = Grid, 2= RichText
        let products = [];
        let rawProduct = [];
        let productGroupType = '';
        let productMediaList = [];
        let rawMediaData = [];
        let checkedData = [];
        let checkedOrdersData = [];
        let richDescriptions = [];
        let selectedImageList = [];
        let selectedVideoList = [];
        let selectedCollectionList = [];
        let selectedCategoryList = [];
        let rawCategoryList = [];
        let selectedOrdersProductsList = [];
        let selectedProductGridData = [];
        let selectedStockCodeGridData = [];
        let dynamicCollections = [];
        let ordersList = [];
        let selectedTreeItem = { id: 0, type: '', viewType: '' };
        let imageUploadPath = '/MassUpdater/UploadImage';
        let selectedMainContainer = HeaderToolBar.None;
        let isUpdateInProcess = false;
        let preOrderFormCreated = false;

        //Order Variables 
        let ordersTreeData = [];
        let orderCustomDates = { fromDate: '', toDate: '' };

        //LayoutIds
        let groupTreeHeaderId = 'groupTree_header';
        let gridHeaderId = 'dataList_header';
        let detailHeaderId = 'detail_header';
        let detailContainerHeaderId = 'detail_container';
        let detailContainerId = 'detail_container_child';
        let videoContainerId = 'detail_container_child2';
        let dataGridContainerId = 'dataList';
        let treeContainerId = 'groupTree';
        let childHeader = 'childHeader';
        let childDetail = 'childDetail';

        let toolbarContainerTree = 'toolbar_container_tree';
        let toolbarContainerList = 'toolbar_container_list';
        let toolbarContainerDetail = 'toolbar_container_detail';
        let headerBarContainer = 'toolbar_container_mainheader';


        let toolBarTabField = FieldGroupType.BasicInfo;
        let toolBarOrderTabField = OrderFieldGroup.BasicInfo;
        let viewType = DataListToolBarEvents[DataListToolBarEvents.LightView];
        let filter = DataListToolBarEvents[DataListToolBarEvents.FilterShowAll];

        //let newToolBarHeader = [
        //    {
        //        id: HeaderToolBar[HeaderToolBar.CataLogue],
        //        type: "navItem",
        //        icon: "fa fa-pencil-square-o",
        //        value: "Catalogue",
        //        tooltip: "Catalogue"
        //    },
        //    {
        //        type: "separator"
        //    },
        //    {
        //        id: HeaderToolBar[HeaderToolBar.Orders],
        //        type: "navItem",
        //        icon: "fa fa-shopping-cart",
        //        value: "Orders",
        //        tooltip: "Orders"
        //    }
        //];

        //Layout Container Section
        thisComponent.layoutContainer = new dhx.Layout("layout_container", {
            rows: [
                { id: headerBarContainer, header: "" },
                {
                    id: "main_canvas",
                    align: "center",
                    gravity: false,
                    cols: [
                        {
                            header: "", id: groupTreeHeaderId, collapsable: false, resizable: true, gravity: true,
                            rows: [
                                { id: toolbarContainerTree, header: "", height: 60, autoWidth: true },
                                { id: treeContainerId, header: "Tree", css: "treeCss" }
                            ]
                        },
                        {
                            header: "Products", id: gridHeaderId, collapsable: false, resizable: true, gravity: false,
                            rows: [
                                { id: toolbarContainerList, height: 60, header: "", autoWidth: true },
                                { id: dataGridContainerId, header: "Products", height: 800, autoWidth: true, css: "layoutCss" }
                            ]
                        },
                        {
                            header: "Product Detail", id: detailHeaderId, collapsable: true, resizable: true, gravity: false,
                            rows: [
                                { id: toolbarContainerDetail, height: 60, header: "", autoWidth: false },
                                {
                                    id: detailContainerHeaderId, header: "", autoWidth: false, rows: [
                                        { id: detailContainerId, header: "", autoWidth: false },
                                        { id: videoContainerId, header: "", autoWidth: false },
                                    ],
                                    css: "detailLayoutCss"
                                }
                            ]
                        },
                    ]
                }
            ],
            autoWidth: true
        });

        //Toolbar Load section and First Load Section 
        //thisComponent.headerToolBar = new dhx.Toolbar(headerBarContainer, { css: "headerToolbarCss" });
        //thisComponent.headerToolBar.data.parse(newToolBarHeader);

        if (massUpdaterType != null) {
            massUpdaterType = massUpdaterType.toLowerCase();
            massUpdaterType = massUpdaterType.charAt(0).toUpperCase() + massUpdaterType.slice(1);
        }

        switch (massUpdaterType) {
            case MassUpdaterType[MassUpdaterType.Product]:
                clearReusedVariables();
                await createMainCatalogueContainer();
                break;
            case MassUpdaterType[MassUpdaterType.Order]:
                clearReusedVariables();
                await createMainOrdersContainer();
                break;
        }

        //Header Toolbar Section
        //thisComponent.headerToolBar.events.on("Click", async function (id, e) {
        //    switch (id) {
        //        case HeaderToolBar[HeaderToolBar.CataLogue]:
        //            clearReusedVariables();
        //            await createMainCatalogueContainer();
        //            break;
        //        case HeaderToolBar[HeaderToolBar.Orders]:
        //            clearReusedVariables();
        //            await createMainOrdersContainer();
        //            break;
        //    }
        //});

        //Catalogue Section
        async function createMainCatalogueContainer() {
            selectedMainContainer = HeaderToolBar.CataLogue;
            var container = { treeHeader: 'Categories', gridHeader: 'Products', detailHeader: 'Properties' }
            //Detach any old implementation
            detachMainContainers([], container);

            let toolBarTreeCatalog = [
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeRefresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Tree"
                },
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeExpandAll],
                    value: "Expand",
                    type: "navItem",
                    icon: "fa fa-expand",
                    tooltip: "Expand Tree"
                },
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeCollapseAll],
                    value: "Collapse",
                    type: "navItem",
                    icon: "fa fa-compress",
                    tooltip: "Collapse Tree"
                }
            ];

            let toolBarDataCatalogue = [
                {
                    type: "block",
                    direction: "col",
                    "items": [
                        {
                            id: "datalistView",
                            type: "selectButton",
                            value: "Light View",
                            tooltip: "View Types",
                            size: "small",
                            items: [
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.LightView],
                                    //type: "button",
                                    value: "Light View",
                                    tooltip: "Summarised View",
                                    twoState: true
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.LargeView],
                                    //type: "button",
                                    value: "Large View",
                                    tooltip: "Large View",
                                    twoState: true
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.Delivery],
                                    //type: "button",
                                    value: "Delivery",
                                    tooltip: "Delivery",
                                    twoState: true
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.Prices],
                                    type: "button",
                                    value: "Prices",
                                    tooltip: "Prices",
                                    twoState: true
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.SEOInfo],
                                    type: "button",
                                    value: "SEOInfo",
                                    tooltip: "SEOInfo",
                                    twoState: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "separator"
                },
                {
                    type: "block",
                    direction: "col",
                    "items": [
                        {
                            id: DataListToolBarEvents[DataListToolBarEvents.Filter],
                            type: "selectButton",
                            icon: "fa fa-filter",
                            value: "Filter",
                            tooltip: "Filter Columns",
                            size: "small",
                            items: [
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterReset],
                                    value: "Reset All",
                                    tooltip: "Reset All"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterShowAll],
                                    icon: "fa fa-plus",
                                    value: "Show All",
                                    tooltip: "Show All"
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterHideAll],
                                    icon: "fa fa-minus",
                                    value: "Hide All",
                                    tooltip: "Hide All"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: DataListToolBarEvents[DataListToolBarEvents.ListRefresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Item"
                },
                {
                    id: DataListToolBarEvents[DataListToolBarEvents.GridExport],
                    value: "Export",
                    type: "navItem",
                    icon: "fa fa-file-excel-o",
                    tooltip: "Export Excel"
                }
            ];

            let toolBarDetailCatalogue = [
                {
                    type: "block",
                    direction: "col",
                    "items": [
                        {
                            id: "select",
                            type: "selectButton",
                            icon: "fa fa-info-circle",
                            value: "BasicInfo",
                            tooltip: "Select Operations",
                            size: "small",
                            items: [
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridBasicInfo],
                                    icon: "mdi mdi-information",
                                    value: "BasicInfo",
                                    tooltip: "Product Name",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridDescription],
                                    icon: "mdi mdi-format-textbox",
                                    value: "Description",
                                    tooltip: "Product Description",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridIdentifiers],
                                    icon: "mdi mdi-barcode-scan",
                                    value: "Identifiers",
                                    tooltip: "Product Identifiers",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridMedia],
                                    icon: "mdi mdi-image-plus",
                                    value: "Media",
                                    tooltip: "Product Media",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridDimensions],
                                    icon: "mdi mdi-table-merge-cells",
                                    value: "Dimensions",
                                    tooltip: "Dimensions Information",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridPricing],
                                    icon: "mdi mdi-currency-gbp",
                                    value: "Pricing",
                                    tooltip: "Pricing Information",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridCategory],
                                    icon: "fa fa-list-alt",
                                    value: "Categories",
                                    tooltip: "Product Catgory",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridSEO],
                                    icon: "mdi mdi-search-web",
                                    value: "SEO",
                                    tooltip: "SEO Information",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridCollections],
                                    icon: "mdi mdi-tournament",
                                    value: "Collections",
                                    tooltip: "Dynamic Collections",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridGiftWrap],
                                    icon: "mdi mdi-wallet-giftcard",
                                    value: "GiftWrap",
                                    tooltip: "Select Gift Wrap",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridPurchasibilty],
                                    icon: "mdi mdi-cart-outline",
                                    value: "Purchasability",
                                    tooltip: "Purchasability",
                                    twoState: true
                                },
                                {
                                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridDomains],
                                    icon: "mdi mdi-domain",
                                    value: "Domains",
                                    tooltip: "Domains",
                                    twoState: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "separator"
                },
                {
                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridRefresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Item"
                },
                {
                    id: DetailListToolBarEvents[DetailListToolBarEvents.GridSave],
                    value: "Save",
                    type: "navItem",
                    icon: "fa fa-save",
                    tooltip: "Save Details"
                }
            ];



            //Toolbar Tree Catalogue
            thisComponent.toolBarTree = new dhx.Ribbon(toolbarContainerTree, { css: "toolBarDetailCss" });
            thisComponent.toolBarTree.data.parse(toolBarTreeCatalog);
            thisComponent.layoutContainer.cell(toolbarContainerTree).attach(thisComponent.toolBarTree);


            //Toolbar Products Catalogue
            thisComponent.toolBarDataGrid = new dhx.Ribbon(toolbarContainerList, { css: "toolBarDetailCss" });
            thisComponent.toolBarDataGrid.data.parse(toolBarDataCatalogue);
            thisComponent.layoutContainer.cell(toolbarContainerList).attach(thisComponent.toolBarDataGrid);


            //Toolbar Products Detail
            thisComponent.toolBarDetailGrid = new dhx.Ribbon(toolbarContainerDetail, { css: "toolBarDetailCss" });
            thisComponent.toolBarDetailGrid.data.parse(toolBarDetailCatalogue);
            thisComponent.layoutContainer.cell(toolbarContainerDetail).attach(thisComponent.toolBarDetailGrid);

            //Tree Section Create and Load Data 
            thisComponent.groupTree = new dhx.Tree(thisComponent.layoutContainer.cell(treeContainerId), {
                icon: {
                    folder: "fa fa-folder",
                    openFolder: "fa fa-folder-open",
                    file: "fa fa-file"
                }
            });
            let treeData = await getTreeDataJson();
            thisComponent.groupTree.data.parse(treeData);
            thisComponent.layoutContainer.cell(treeContainerId).attach(thisComponent.groupTree);

            //Data Grid Section
            thisComponent.dataGrid = new dhx.Grid(dataGridContainerId, { selection: "row", keyNavigation: true, multiselection: true, adjust: false, autoWidth: false });
            thisComponent.layoutContainer.cell(dataGridContainerId).attach(thisComponent.dataGrid);

            await createTreeEvents(treeData);
            await createToolbarEvents();
            await createGridEvents();

        }

        async function createTreeEvents(treeData) {
            //Tree Events
            thisComponent.groupTree.events.on("itemClick", async function (id, e) {
                treeData.forEach(function (value) {     //1 st level
                    if (value.id == id) {
                        productGroupType = value
                    }
                    else {
                        if (value.items != null) {
                            value.items.forEach(function (subItems) {   //2 nd level
                                if (subItems.id == id) {
                                    productGroupType = value.type
                                }
                                else {
                                    if (subItems.items != null) {
                                        subItems.items.forEach(function (item) {   //3 rd level
                                            if (item.id == id) {
                                                productGroupType = value.type
                                            }
                                            else {
                                                if (item.items != null) {
                                                    item.items.forEach(function (subItem) {   //4th level
                                                        if (subItem.id == id) {
                                                            productGroupType = value.type
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                });
                if (typeof productGroupType === 'string') {
                    selectedTreeItem.id = id;
                    selectedTreeItem.type = productGroupType;
                    let gridState = DataListToolBarEvents[DataListToolBarEvents.LightView];
                    let gridDataState = thisComponent.toolBarDataGrid.getState();
                    if (gridDataState.datalistView == 'Light View') {
                        gridState = DataListToolBarEvents[DataListToolBarEvents.LightView];
                    }
                    if (gridDataState.datalistView == 'Large View') {
                        gridState = DataListToolBarEvents[DataListToolBarEvents.LargeView];
                    }
                    if (gridDataState.datalistView == 'Delivery') {
                        gridState = DataListToolBarEvents[DataListToolBarEvents.Delivery];
                    }
                    if (gridDataState.datalistView == 'Prices') {
                        gridState = DataListToolBarEvents[DataListToolBarEvents.Prices];
                    }
                    products = await getProducts(productGroupType, id);
                    rawProduct = Object.assign([], products);
                    //Create Grid Data Layout for Products
                    createGridDataLayout(products);

                    //Clear old data from grid and detail grid
                    checkedData = [];
                    selectedGridData = [];
                    selectedDetailGridData = [];
                    dynamicCollections = [];
                    selectedCollectionList = [];
                    if (componentType.type == 2) {
                        detachLayoutContainerObject(detailContainerId, [], []);
                    }
                    viewType = gridState;
                    loadGridData(products, viewType, filter);
                }
            });
        }

        async function createToolbarEvents() {
            //ToolBar Tree 
            thisComponent.toolBarTree.events.on("Click", async function (id, e) {
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeRefresh]) {
                    let treeData = await getTreeDataJson()
                    thisComponent.groupTree.data.parse(treeData);
                }
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeExpandAll]) {
                    thisComponent.groupTree.openAll();
                }
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeCollapseAll]) {
                    thisComponent.groupTree.closeAll();
                }
            });

            //ToolBar Data Grid
            thisComponent.toolBarDataGrid.events.on("Click", async function (id, e) {
                switch (id) {
                    case DataListToolBarEvents[DataListToolBarEvents.LightView]:
                        thisComponent.toolBarDataGrid.setState({ "LightView": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.LightView];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.LargeView]:
                        thisComponent.toolBarDataGrid.setState({ "LargeView": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.LargeView];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.Delivery]:
                        thisComponent.toolBarDataGrid.setState({ "Delivery": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.Delivery];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.Prices]:
                        thisComponent.toolBarDataGrid.setState({ "Prices": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.Prices];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.SEOInfo]:
                        thisComponent.toolBarDataGrid.setState({ "SEOInfo": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.SEOInfo];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterReset]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterShowAll];
                            loadGridData(products, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterShowAll];
                            loadGridData(products, viewType, filter)
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterHideAll]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterHideAll];
                            loadGridData(products, viewType, filter)
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.ListRefresh]:
                        thisComponent.dataGrid.content.inputFilter.value = {};
                        thisComponent.dataGrid.content.selectFilter.value = {};
                        thisComponent.dataGrid.data.parse(rawProduct);
                        thisComponent.dataGrid.paint();
                        refreshDataGrid([]);
                        selectedDetailGridData = [];
                        checkedData = [];
                        selectedGridData = [];
                        $('#selectAllCheckbox').prop('checked', false);
                        detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.GridExport]:
                        if (products.length > 0) {
                            var serializesData = thisComponent.dataGrid.data.serialize();
                            var treeId = selectedTreeItem.id;
                            var productType = selectedTreeItem.type;
                            var ids = serializesData.map((obj) => obj.id).join(',');
                            if (treeId != null && productType != "" && ids != "") {
                                exportExcel(viewType, productType, treeId, ids);
                            }
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.PrintGrid]:
                        if (products.length > 0) {
                            var html = $(".dhx_grid-content").clone();
                            $(html[0]).find(".dhx_header-rows .dhx_header-row:eq(1)").remove();
                            $(html[0]).find(".dhx_grid-body .dhx_header-wrapper").removeAttr("style");
                            $(html[0]).find(".dhx_grid-header").css("height", "41px");
                            $(html[0]).find(".dhx_grid-header-cell--align_right").css("padding-left", "8px");
                            var win = window.open('', 'printwindow');
                            win.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="../assets/libs/dhx/suite.css"></head><body>' +
                                $(html[0]).find('.dhx_grid-body').html() +
                                '</body></html>');
                        }
                        break;
                    default:
                        break;
                }
            });

            //ToolBar Detail Grid
            thisComponent.toolBarDetailGrid.events.on("Click", async function (id, e) {
                switch (id) {
                    case DetailListToolBarEvents[DetailListToolBarEvents.GridBasicInfo]:
                        thisComponent.toolBarDetailGrid.setState({ "GridBasicInfo": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.BasicInfo;
                        //From API
                        await refreshDetailGrid(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridDescription]:
                        thisComponent.toolBarDetailGrid.setState({ "GridDescription": true });
                        removeMediaEvents();
                        var selectedDesc = selectedGridData;
                        componentType.type = 2;
                        toolBarTabField = FieldGroupType.Description
                        if (selectedDesc.length > 0) {
                            //Richtext Section
                            createMultipleRichTextContainers()
                            //refreshDataGrid(selectedGridData);
                        }
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridCategory]:
                        thisComponent.toolBarDetailGrid.setState({ "GridCategory": true });
                        removeMediaEvents();
                        selectedCategoryList = [];
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Category
                        createGridTreeContainer(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridIdentifiers]:
                        thisComponent.toolBarDetailGrid.setState({ "GridIdentifiers": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Identifiers
                        //From API
                        await refreshDetailGrid(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridMedia]:
                        thisComponent.toolBarDetailGrid.setState({ "GridMedia": true });
                        removeMediaEvents();
                        selectedDetailGridData = [];
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Media
                        //From API 
                        await createMediaContainers("", false);
                        thisComponent.toolBarDetailGrid.data.add({
                            id: DetailListToolBarEvents[DetailListToolBarEvents.UploadMedia],
                            value: "Upload Image",
                            type: "navItem",
                            icon: "fa fa-upload",
                            tooltip: "Upload Image"
                        });
                        thisComponent.toolBarDetailGrid.data.add({
                            id: DetailListToolBarEvents[DetailListToolBarEvents.UploadVideoMedia],
                            value: "Add Video",
                            type: "navItem",
                            icon: "fa fa-plus",
                            tooltip: "Add Video"
                        });
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridSEO]:
                        thisComponent.toolBarDetailGrid.setState({ "GridSEO": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.SeoInfo
                        //From API 
                        await refreshDetailGrid(false);
                        createDetailGridEvents();
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridPurchasibilty]:
                        thisComponent.toolBarDetailGrid.setState({ "GridPurchasibilty": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Purchasibilty
                        //From API 
                        await refreshDetailGrid(false);
                        createDetailGridEvents();
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridPricing]:
                        thisComponent.toolBarDetailGrid.setState({ "GridPricing": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Pricing;
                        //From API
                        await refreshDetailGrid(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridDimensions]:
                        thisComponent.toolBarDetailGrid.setState({ "GridDimensions": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Dimensions;
                        //From API
                        await refreshDetailGrid(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridShipping]:
                        thisComponent.toolBarDetailGrid.setState({ "GridShipping": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Shipping;
                        //From API
                        await refreshDetailGrid(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridCollections]:
                        thisComponent.toolBarDetailGrid.setState({ "GridCollections": true });
                        removeMediaEvents();
                        //let selected = selectedGridData;
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Collections;
                        //From API
                        await refreshDetailGrid(false);
                        createCollectionSelectEvents();
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridGiftWrap]:
                        thisComponent.toolBarDetailGrid.setState({ "GridGiftWrap": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.GiftWrap;
                        //From API
                        await createCollectionContainers(false);
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridBrands]:
                        thisComponent.toolBarDetailGrid.setState({ "GridBrands": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Brands;
                        //From API
                        await createBrandsContainers();
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridDomains]:
                        thisComponent.toolBarDetailGrid.setState({ "GridDomains": true });
                        removeMediaEvents();
                        componentType.type = 1;
                        toolBarTabField = FieldGroupType.Domains
                        //From API 
                        await refreshDetailGrid(false);
                        createDetailGridEvents();
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.UploadMedia]:
                        let record = [];
                        record = selectedGridData;
                        let mediaList = productMediaList;
                        let selectedProductIds = selectedGridData.map(function (record) { return record.id }).join(",");
                        thisComponent.uploader = new dhx.Vault(thisComponent.layoutContainer.cell(detailContainerId), {
                            uploader: {
                                target: imageUploadPath,
                                singleRequest: false,
                                autosend: false,
                                customScroll: true,
                                params: {
                                    id: selectedProductIds,
                                    productType: FieldGroupType.Media
                                }
                            },
                            mode: "grid",
                            scaleFactor: 1,
                            autoWidth: false,
                            toolbar: true
                        });
                        thisComponent.uploader.toolbar.data.update("upload", { icon: "fa fa-cloud-upload" });
                        thisComponent.uploader.toolbar.data.update("cancel", { icon: "fa fa-cancel" });
                        //Uploader Events
                        thisComponent.uploader.events.on("BeforeAdd", function (item) {
                            let allowedFileTypes = "image/png,image/jpeg,image/jpg";
                            let ifFileAllowed = allowedFileTypes.indexOf(item.file.type) != -1;
                            if (thisComponent.uploader.data.getLength() >= 5) {
                                dhx.message({
                                    text: "Max number of 5 files allowed !!",
                                    expire: 3000,
                                    type: "customCss"
                                });
                                return false;
                            }
                            if (ifFileAllowed == false) {
                                dhx.message({
                                    text: "Please select an image to upload !!",
                                    expire: 3000,
                                    type: "customCss"
                                });
                                return false;
                            }
                        });

                        thisComponent.uploader.events.on("BeforeUploadFile", async function (files) {
                            if (selectedImageList.length == 0) {
                                let firstFile = thisComponent.uploader.data._order[0];
                                firstFile.isDefaut = true;
                                firstFile.file.isDefaut = true;
                            }
                            //console.log("A new file is added");
                        });

                        thisComponent.uploader.events.on("AfterAdd", function (file) {
                            //console.log("A new file is added");
                        });

                        thisComponent.uploader.events.on("UploadComplete", async function (files) {
                            //console.log(files);
                            createMediaContainers("Image", false);
                        });
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.UploadVideoMedia]:
                        let selectedStockCodeGridData = selectedGridData.map(function (record) {
                            let obj = {
                                value: record.stockCode,
                                content: record.stockCode,
                            }
                            return obj
                        });
                        const dhxWindow = new dhx.Window({
                            width: 520,
                            height: 420,
                            title: "Add Video",
                            modal: true,
                            resizable: false,
                            movable: true
                        });
                        var form = new dhx.Form("form_container", {
                            css: "dhx_widget--bordered",
                            rows: [
                                {
                                    type: "select",
                                    gravity: false,
                                    label: "StockCode",
                                    name: "stockCode",
                                    options: selectedStockCodeGridData
                                },
                                {
                                    type: "select",
                                    gravity: false,
                                    label: "Media Type",
                                    name: "mediaType",
                                    disabled: true,
                                    options: [
                                        {
                                            value: "Video",
                                            content: "Video"
                                        }
                                    ]
                                },
                                {
                                    type: "input",
                                    gravity: false,
                                    label: "Url",
                                    icon: "fa fa-video-camera",
                                    placeholder: "",
                                    name: "url"
                                },
                                {
                                    align: "end",
                                    cols: [
                                        {
                                            gravity: true,
                                            type: "button",
                                            submit: true,
                                            value: "Save",
                                            size: "medium",
                                            view: "flat",
                                            color: "primary",
                                            id: "button",
                                            name: "button",
                                            method: "POST",
                                            asFormData: true,
                                            url: url + 'AddVideoUrl'
                                        }
                                    ]
                                }
                            ]
                        });
                        dhxWindow.attach(form)
                        dhxWindow.show();
                        form.events.on("BeforeSend", function () {
                            var formData = form._state;
                            var productId = selectedGridData.find(x => x.stockCode === formData.stockCode).id;
                            var isDefaultAlreadySet = false;
                            var count = 0;
                            rawMediaData.forEach(function (item) {
                                if (item.mediaType === "Video") {
                                    count++;
                                    if (item.stockCode === formData.stockCode && item.isDefault === true) {
                                        isDefaultAlreadySet = true;
                                    }
                                }
                            });
                            if (count == 0) {
                                isDefaultAlreadySet = false;
                            }
                            formData.productId = productId;
                            if (isDefaultAlreadySet) {
                                formData.isDefault = false;
                            }
                            else {
                                formData.isDefault = true;
                            }
                            formData.isActive = true;
                        });
                        form.events.on("AfterSend", function () {
                            dhxWindow.hide();
                            createMediaContainers("Video", true);
                        });
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridRefresh]:
                        if (toolBarTabField == FieldGroupType.Media) {
                            isUpdateInProcess = false;
                            await createMediaContainers("", false);
                        }
                        else if (toolBarTabField == FieldGroupType.Description) {

                            await createMultipleRichTextContainers()
                        }
                        else if (toolBarTabField == FieldGroupType.Collections) {

                            await createCollectionContainers(false);
                        }
                        else if (toolBarTabField == FieldGroupType.Category) {

                            await createGridTreeContainer(false);
                        }
                        else if (toolBarTabField == FieldGroupType.Brands) {

                            await createBrandsContainers();
                        }
                        else {
                            await refreshDetailGrid(false);
                        }
                        break;

                    case DetailListToolBarEvents[DetailListToolBarEvents.GridSave]:
                        let selectedItemType = [];
                        var selectedSave = [];
                        switch (toolBarTabField) {
                            case FieldGroupType.BasicInfo:
                                selectedDetailGridData.forEach(function (record) {
                                    if ($("#select" + record.productId)[0] != undefined) {
                                        record.itemType = $("#select" + record.productId)[0].value;
                                    }
                                });
                                selectedSave = selectedDetailGridData;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Shipping:
                                selectedDetailGridData.forEach(function (record) {
                                    var shippingRecord = record.shipping;
                                    let newShipping = [];
                                    shippingRecord.forEach(function (shipRecord) {
                                        let checkValue = $("." + shipRecord.name + record.productId)[0].value;
                                        if (checkValue == "true") {
                                            shipRecord.isSelected = true
                                        }
                                        else {
                                            shipRecord.isSelected = false
                                        }
                                    });
                                });
                                selectedSave = selectedDetailGridData;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Description:
                                if (componentType.type == 2) {
                                    selectedDetailGridData.forEach(function (record) {
                                        richDescriptions.forEach(function (richD) {
                                            if (record.productId == richD.productId) {
                                                record.description = richD.desc.longDescription;
                                                record.shortDescription = richD.desc.shortDescription;
                                                record.notes = richD.desc.notes;
                                            }
                                        })
                                    })
                                    selectedSave = selectedDetailGridData;
                                    saveProperties(selectedSave, toolBarTabField);
                                }
                                break;

                            case FieldGroupType.Media:
                                productMediaList = [];
                                selectedImageList.forEach(function (record) {
                                    let count = 0;
                                    var name = "imageMediaGroup" + record.stockCode;
                                    var selectedImage = $("input[name=" + name + "]:checked").val();
                                    let imageModel = { id: '', productId: '', videos: [], images: [] };
                                    productMediaList.forEach(function (imageRecord) {
                                        if (imageRecord.productId == record.productId) {
                                            record.isDefault = (record.id == selectedImage) ? true : false;
                                            imageRecord.images.push(record);
                                            count++;
                                        }
                                    })
                                    if (count == 0) {
                                        record.isDefault = (record.id == selectedImage) ? true : false;
                                        imageModel.productId = record.productId
                                        imageModel.id = record.productId
                                        imageModel.images.push(record);
                                        productMediaList.push(imageModel);
                                    }
                                });

                                selectedVideoList.forEach(function (record) {
                                    let count = 0;
                                    var name = "videoMediaGroup" + record.stockCode;
                                    var selectedVideo = $("input[name=" + name + "]:checked").val();
                                    let videoModel = { id: '', productId: '', videos: [], images: [] };
                                    productMediaList.forEach(function (videoRecord) {
                                        if (videoRecord.productId == record.productId) {
                                            record.isDefault = (record.id == selectedVideo) ? true : false;
                                            videoRecord.videos.push(record);
                                            count++;
                                        }
                                    })
                                    if (count == 0) {
                                        record.isDefault = (record.id == selectedVideo) ? true : false;
                                        videoModel.productId = record.productId
                                        videoModel.id = record.productId
                                        videoModel.videos.push(record);
                                        productMediaList.push(videoModel);
                                    }
                                });
                                selectedSave = productMediaList;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Collections:
                                let collectionList = [];
                                selectedSave = [];
                                selectedGridData.forEach(function (product) {
                                    let collectionObj = { productId: product.id, collections: selectedCollectionList }
                                    collectionList.push(collectionObj);
                                });
                                let htmlText = '<span>Collection will be updated for following StockCodes : </span></br>';
                                let selectedStockCodes = selectedGridData.map(function (record) { return record.stockCode }).join(',');
                                htmlText = htmlText + selectedStockCodes;
                                dhx.confirm({
                                    header: "Confirmation",
                                    text: htmlText,
                                    buttons: ["Ok", "Cancel"]
                                }).then(async function (answer) {
                                    if (answer) {
                                        selectedSave = collectionList;
                                        saveProperties(selectedSave, toolBarTabField);
                                    }
                                });
                                break;
                            case FieldGroupType.Category:
                                let categoryList = [];
                                selectedGridData.forEach(function (product) {
                                    let categoryObj = { productId: product.id, categories: selectedCategoryList }
                                    categoryList.push(categoryObj);
                                });
                                if (selectedCategoryList.length > 1) {
                                    dhx.alert({
                                        header: "Multiple Categories",
                                        text: "Multiple categories found, please select one category to be updated to all products !!",
                                        css: "categoryMessageBoxCss",
                                        buttons: ["Ok"],
                                        buttonsAlignment: "center"
                                    });
                                }
                                else {
                                    let htmlCatText = '<span>Category will be updated for following StockCodes : </span></br>';
                                    let selectedCatStockCodes = selectedGridData.map(function (record) { return record.stockCode }).join(',');
                                    htmlCatText = htmlCatText + selectedCatStockCodes;
                                    dhx.confirm({
                                        header: "Confirmation",
                                        text: htmlCatText,
                                        buttons: ["Ok", "Cancel"]
                                    }).then(async function (answer) {
                                        if (answer) {
                                            selectedSave = categoryList;
                                            saveProperties(selectedSave, toolBarTabField);
                                        }
                                    });
                                }
                                break;

                            case FieldGroupType.Pricing:
                                selectedDetailGridData.forEach(function (record) {
                                    if ($("#select" + record.productId)[0] != undefined) {
                                        record.taxClassId = $("#select" + record.productId)[0].value;
                                    }
                                });
                                selectedSave = selectedDetailGridData;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.GiftWrap:
                                let giftWraps = [];
                                selectedDetailGridData.forEach(function (record) {
                                    var selectedGWRadio = $("input[name='giftwrap" + record.productId + "']:checked").val();
                                    var giftWOptions = (record.giftWraps != null) ? record.giftWraps : [];
                                    var gwType = $("#selectGiftWType" + record.productId)[0];
                                    var gwTypeValue = (typeof gwType != "undefined") ? gwType.value : 0;
                                    let giftWrapObj = { productId: record.productId, isGiftWrapApplied: false, giftWrapOptionId: '', giftWrapSettings: GiftWrapSettings.DoNotAllowGW, giftWrapType: 0 }
                                    //Allow all
                                    if (selectedGWRadio == GiftWrapSettings[GiftWrapSettings.AllowGWAll]) {
                                        giftWrapObj = { productId: record.productId, isGiftWrapApplied: true, giftWrapOptionId: '', giftWrapSettings: GiftWrapSettings.AllowGWAll, giftWrapType: gwTypeValue }
                                        giftWraps.push(giftWrapObj);
                                    }
                                    //Do not allow
                                    else if (selectedGWRadio == GiftWrapSettings[GiftWrapSettings.DoNotAllowGW]) {
                                        giftWrapObj = { productId: record.productId, isGiftWrapApplied: false, giftWrapOptionId: '', giftWrapSettings: GiftWrapSettings.DoNotAllowGW, giftWrapType: 0 }
                                        giftWraps.push(giftWrapObj);
                                    }
                                    //Selected Gift Wrap
                                    else if (selectedGWRadio == GiftWrapSettings[GiftWrapSettings.SelectedGW]) {
                                        var selectedGW = null;
                                        var giftWrapOptionIds = '';
                                        var types = [];
                                        if (giftWOptions.length > 0) {
                                            giftWOptions.forEach(function (gw) {
                                                var checkBox = $("input[id=giftWrap" + record.productId + "-" + gw.key + "]:checked");
                                                selectedGW = (checkBox.length > 0) ? checkBox[0].value : null;
                                                if (selectedGW != null || selectedGW != undefined) {
                                                    types.push(selectedGW);
                                                }
                                            });
                                            giftWrapOptionIds = types.join(',');
                                            giftWrapObj = { productId: record.productId, isGiftWrapApplied: true, giftWrapOptionId: giftWrapOptionIds, giftWrapSettings: GiftWrapSettings.SelectedGW, giftWrapType: gwTypeValue }
                                            giftWraps.push(giftWrapObj);
                                        }
                                    }
                                });
                                selectedSave = giftWraps;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Brands:
                                let selectedBrandsList = thisComponent.detailGrid.getChecked();
                                let brandsList = [];
                                selectedGridData.forEach(function (record) {
                                    let productObj = {};
                                    if (selectedBrandsList != null) {
                                        productObj = { productId: record.id, brands: selectedBrandsList }
                                    }
                                    brandsList.push(productObj);
                                })
                                selectedSave = brandsList;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Purchasibilty:
                                let purchasibiltyList = [];
                                selectedDetailGridData.forEach(function (record) {
                                    let productObj = {};
                                    var preOrderEnabled = false;
                                    if (record.launchDate != null) {
                                        var date = new Date(record.launchDate);
                                        record.launchDateString = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                    }
                                    var $radios = $('input:radio[name="purchasability' + record.productId + '"]');
                                    if ($radios.is('[value=' + PurchasabilityType[PurchasabilityType.PreOrder] + ']:checked') === true) {
                                        preOrderEnabled = true;
                                        record.purchasabilityType = PurchasabilityType[PurchasabilityType.PreOrder];
                                    }
                                    else if ($radios.is('[value=' + PurchasabilityType[PurchasabilityType.OnlineStore] + ']:checked') === true) {
                                        record.purchasabilityType = PurchasabilityType[PurchasabilityType.OnlineStore];
                                    }
                                    else if ($radios.is('[value=' + PurchasabilityType[PurchasabilityType.ForwardOrder] + ']:checked') === true) {
                                        record.purchasabilityType = PurchasabilityType[PurchasabilityType.ForwardOrder];
                                    }
                                    if ((record.purchasabilityType == PurchasabilityType[PurchasabilityType.PreOrder]) || (record.purchasabilityType == PurchasabilityType.PreOrder)) {
                                        preOrderEnabled = true;
                                    }
                                    if (purchasibiltyList != null) {
                                        productObj = { productId: record.id, enabled: preOrderEnabled, shortMessage: record.shortMessage, purchasabilityType: record.purchasabilityType, maxStock: record.maxStock, launchDateString: record.launchDateString, launchDate: record.launchDate }
                                    }
                                    purchasibiltyList.push(productObj);
                                })
                                selectedSave = purchasibiltyList;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            case FieldGroupType.Domains:
                                let domainsList = [];
                                selectedDetailGridData.forEach(function (record) {
                                    var isActive = $("input[id=active" + record.domainId + "-" + record.productId + "]:checked");
                                    var selectedIsActive = (isActive.length > 0) ? ((isActive[0].value === "true") ? true : false) : false;

                                    var isVisible = $("input[id=visible" + record.domainId + "-" + record.productId + "]:checked");
                                    var selectedIsVisible = (isVisible.length > 0) ? ((isVisible[0].value === "true") ? true : false) : false;

                                    var backOrder = $("input[id=sellWithoutInventory" + record.domainId + "-" + record.productId + "]:checked");
                                    var selectedBackOrder = (backOrder.length > 0) ? ((backOrder[0].value === "true") ? true : false) : false;

                                    var shoppingFeed = $("input[id=excludeFromShoppingFeed" + record.domainId + "-" + record.productId + "]:checked");
                                    var selectedShoppingFeed = (shoppingFeed.length > 0) ? ((shoppingFeed[0].value === "true") ? true : false) : false;

                                    var preOrderDomains = $("input[id=preOrderDomains" + record.domainId + "-" + record.productId + "]:checked");
                                    var selectedPreOrderDomains = (preOrderDomains.length > 0) ? ((preOrderDomains[0].value === "true") ? true : false) : false;

                                    var textBoxId = "#preOrderMaxStock" + record.domainId + "-" + record.productId;
                                    var preOrderMaxStock = $(textBoxId).val();

                                    let domainObj = {};
                                    if (domainsList != null) {
                                        domainObj = { productId: record.productId, isActive: selectedIsActive, isVisible: selectedIsVisible, sellWithoutInventory: selectedBackOrder, excludeFromShoppingFeed: selectedShoppingFeed, domainId: record.domainId, domainName: record.domainName, stockCode: record.stockCode, preOrder: selectedPreOrderDomains, maxStock: preOrderMaxStock, isMaster: record.isMaster };
                                    }
                                    domainsList.push(domainObj);
                                })
                                selectedSave = domainsList;
                                saveProperties(selectedSave, toolBarTabField);
                                break;

                            default:
                                selectedSave = selectedDetailGridData;
                                saveProperties(selectedSave, toolBarTabField);
                                break;
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        function removeMediaEvents() {
            thisComponent.toolBarDetailGrid.data.remove(DetailListToolBarEvents[DetailListToolBarEvents.UploadMedia]);
            thisComponent.toolBarDetailGrid.data.remove(DetailListToolBarEvents[DetailListToolBarEvents.UploadVideoMedia]);
        }

        async function saveProperties(selectedSave, toolBarTabField) {
            if (selectedSave != null) {
                var result = await saveProductFieldData(toolBarTabField, selectedSave);
                var text = "Product(s) " + FieldGroupType[toolBarTabField].toLowerCase() + " updated !!!";
                if (result.result.IsValid) {
                    dhx.message({
                        text: text,
                        expire: 3000,
                        type: "customCss"
                    });
                } else {
                    dhx.message({
                        text: "Please validate all the changes !!",
                        expire: 3000,
                        type: "customCss"
                    });
                }
                richDescriptions = [];
                //await refreshDataGrid(selectedGridData);
                if (componentType.type != 2) {
                    //detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
                    if (toolBarTabField == FieldGroupType.Media) {
                        await createMediaContainers("", true)
                    }
                    else if (toolBarTabField == FieldGroupType.Collections) {
                        await createCollectionContainers(true);
                    }
                    else if (toolBarTabField == FieldGroupType.Category) {
                        await createGridTreeContainer(true);
                    }
                    else if (toolBarTabField == FieldGroupType.Brands) {
                        await createBrandsContainers();
                    }
                    else {
                        selectedSave = selectedDetailGridData;
                        await refreshDetailGrid(true);
                    }

                }
            }
        }

        async function createGridEvents() {
            //Grid Events
            thisComponent.dataGrid.events.on("CellClick", async function (row, column, e) {
                var selection = thisComponent.dataGrid.selection.getCells();
                var selectedRecords = selection.map(function (item) {
                    return item.row;
                })
                var isSelectedRecord = selectedRecords.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
                if (isSelectedRecord.length > 0) {
                    //Remove old css
                    if (checkedData.length > 0) {
                        checkedData.forEach(function (record) {
                            record.isSelected = false;
                            thisComponent.dataGrid.removeRowCss(record.id, "myCustomSelectionClass");
                        })
                    }
                    checkedData = [];
                    selectedGridData = [];
                    //Add Selected Row Css
                    isSelectedRecord.forEach(function (row) {
                        thisComponent.dataGrid.addRowCss(row.id, "myCustomSelectionClass");
                        row.isSelected = true;
                        if (checkedData.length == 0) {
                            checkedData.unshift(row);
                            selectedGridData.unshift(row);
                        }
                        else {
                            let count = 0
                            checkedData.forEach(function (record) {
                                if (record.id == row.id) {
                                    count++;
                                }
                            });
                            if (count == 0) {
                                checkedData.push(row);
                                selectedGridData = Object.assign([], checkedData);
                            }
                        }
                    });

                }
                await updateDetailGrid();
            });

            thisComponent.dataGrid.events.on("HeaderCellClick", async function (column, e) {
                if (column.id == "isSelected") {
                    var isAllSelected = $('#selectAllCheckbox').is(":checked");
                    if (isAllSelected) {
                        products = Object.assign([], rawProduct);
                        products.forEach(function (record) {
                            record.isSelected = true;
                            thisComponent.dataGrid.addRowCss(record.id, "myCustomSelectionClass");
                        });
                        checkedData = [];
                        selectedGridData = [];
                        checkedData = products;
                        selectedGridData = products;
                    }
                    else {
                        products = Object.assign([], rawProduct);
                        products.forEach(function (record) {
                            record.isSelected = false;
                            thisComponent.dataGrid.removeRowCss(record.id, "myCustomSelectionClass");
                        });
                        checkedData = [];
                        selectedGridData = [];
                    }

                    await updateDetailGrid();
                }
            });
        }

        async function updateDetailGrid() {
            selectedDetailGridData = []
            let productIds = '';
            let gridState = thisComponent.toolBarDetailGrid.getState();
            switch (gridState.select) {
                case FieldGroupType[FieldGroupType.BasicInfo]:
                    toolBarTabField = FieldGroupType.BasicInfo
                    break;
                case FieldGroupType[FieldGroupType.Description]:
                    toolBarTabField = FieldGroupType.Description
                    break;
                case FieldGroupType[FieldGroupType.Identifiers]:
                    toolBarTabField = FieldGroupType.Identifiers
                    break;
                case FieldGroupType[FieldGroupType.Media]:
                    toolBarTabField = FieldGroupType.Media
                    break;
                case FieldGroupType[FieldGroupType.SeoInfo]:
                    toolBarTabField = FieldGroupType.SeoInfo
                    break;
                case FieldGroupType[FieldGroupType.Pricing]:
                    toolBarTabField = FieldGroupType.Pricing
                    break;
                case FieldGroupType[FieldGroupType.Dimensions]:
                    toolBarTabField = FieldGroupType.Dimensions
                    break;
                case FieldGroupType[FieldGroupType.Shipping]:
                    toolBarTabField = FieldGroupType.Shipping
                    break;
                case FieldGroupType[FieldGroupType.Collections]:
                    toolBarTabField = FieldGroupType.Collections
                    break;
                case FieldGroupType[FieldGroupType.GiftWrap]:
                    toolBarTabField = FieldGroupType.GiftWrap
                    break;
                case FieldGroupType[FieldGroupType.Brands]:
                    toolBarTabField = FieldGroupType.Brands
                    break;
                default:
                    break;
            }

            let result = [];
            productIds = checkedData.map(function (record) { return record.id }).join(",");
            if (productIds != "") {
                result = await getProductFieldInfo(toolBarTabField, productIds);
            }
            selectedDetailGridData = result;
            if (selectedDetailGridData == null) {
                selectedDetailGridData = [];
            }
            if (selectedDetailGridData.length == 0) {
                selectedDetailGridData = [];
            }

            if (toolBarTabField == FieldGroupType.Description) {
                //Richtext Section
                createMultipleRichTextContainers();
            }
            else if (toolBarTabField == FieldGroupType.Media) {
                //Create Media Containers 
                createMediaContainers("", false)
            }
            else if (toolBarTabField == FieldGroupType.Collections) {
                //Create Collection Container
                await createCollectionContainers(false);
            }
            else if (toolBarTabField == FieldGroupType.Category) {
                //Create Collection Container
                await createGridTreeContainer(true)
            }
            else if (toolBarTabField == FieldGroupType.Brands) {
                //Create Brands Container
                await createBrandsContainers()
            }
            else {
                createDetailGridContainer(selectedDetailGridData, toolBarTabField, false);
            }
        }

        //RichText Events
        function richTextEvents(records) {
            let containers = [];
            let descriptionObj = { productId: '', desc: { shortDescription: '', longDescription: '', notes: '' } };

            //Create events for all Short Descriptions
            records.forEach(function (record) {
                let containerObj = { containerName: "short" + record.productId, productId: record.productId };
                thisComponent[containerObj.containerName].events.on("Change", function () {
                    var desc = thisComponent[containerObj.containerName].getValue();
                    if (richDescriptions.length != 0) {
                        let count = 0;
                        richDescriptions.forEach(function (richD) {
                            if (richD.productId == containerObj.productId) {
                                richD.desc.shortDescription = desc
                                count++
                            }
                        })
                        if (count == 0) {
                            descriptionObj = { productId: containerObj.productId, desc: { shortDescription: desc, longDescription: '', notes: '' } };
                            richDescriptions.push(descriptionObj)
                        }
                    }
                });
            });

            //Create events for all Long Descriptions
            records.forEach(function (record) {
                let containerObj = { containerName: "long" + record.productId, productId: record.productId };
                thisComponent[containerObj.containerName].events.on("Change", function () {
                    var desc = thisComponent[containerObj.containerName].getValue();
                    if (richDescriptions.length != 0) {
                        let count = 0;
                        richDescriptions.forEach(function (richD) {
                            if (richD.productId == containerObj.productId) {
                                richD.desc.longDescription = desc
                                count++
                            }
                        })
                        if (count == 0) {
                            descriptionObj = { productId: containerObj.productId, desc: { shortDescription: '', longDescription: desc, notes: '' } };
                            richDescriptions.push(descriptionObj)
                        }
                    }
                });
            });

            //Create events for all Notes
            records.forEach(function (record) {
                let containerObj = { containerName: "notes" + record.productId, productId: record.productId };
                thisComponent[containerObj.containerName].events.on("Change", function () {
                    var notes = thisComponent[containerObj.containerName].getValue();
                    if (richDescriptions.length != 0) {
                        let count = 0;
                        richDescriptions.forEach(function (richD) {
                            if (richD.productId == containerObj.productId) {
                                richD.desc.notes = notes
                                count++
                            }
                        })
                        if (count == 0) {
                            descriptionObj = { productId: containerObj.productId, desc: { shortDescription: '', longDescription: '', notes: notes } };
                            richDescriptions.push(descriptionObj)
                        }
                    }
                });
            });
        }

        function createCollectionSelectEvents() {
            //Select Collections using cellClick function
            thisComponent.detailGrid.events.on("cellClick", async function (row, column, e) {
                if (toolBarTabField == FieldGroupType.Collections) {
                    var isSelectedRecord = $('#checkbox' + row.key).val();
                    if (isSelectedRecord == 'true') {
                        row.isSelected = true;
                        if (selectedCollectionList.length == 0) {
                            selectedCollectionList.unshift(row);
                        }
                        else {
                            let count = 0
                            selectedCollectionList.forEach(function (record) {
                                if (record.id == row.id) {
                                    count++;
                                }
                            });
                            if (count == 0) {
                                selectedCollectionList.push(row);
                            }
                        }
                    }
                    else {
                        var ind = 0
                        row.isSelected = false;
                        selectedCollectionList.forEach(function (record) {
                            if (record.id == row.id) {
                                selectedCollectionList.splice(ind, 1);
                            }
                            ind++;
                        })
                    }
                }
            })
        }

        function createCategorySelectEvents() {
            thisComponent.detailGrid.events.on("cellClick", async function (row, column, e) {
                if (toolBarTabField == FieldGroupType.Category) {
                    var isSelectedRecord = $('#checkbox' + row.id).val();
                    if (isSelectedRecord == "true") {
                        row.isSelected = true;
                        rawCategoryList.forEach(function (record) {
                            if (record.id == row.id) {
                                record.isSelected = true;
                            }
                            else {
                                record.isSelected = false;
                            }
                        });
                        thisComponent.detailGrid.data.parse(rawCategoryList);
                        thisComponent.detailGrid.paint();
                        if (selectedCategoryList.length == 0) {
                            selectedCategoryList.unshift(row);
                        }
                        else {
                            let count = 0
                            selectedCategoryList.forEach(function (record) {
                                if (record.id == row.id) {
                                    count++;
                                }
                            });
                            if (count == 0) {
                                selectedCategoryList = [];
                                selectedCategoryList.push(row);
                            }
                        }
                    }
                    else {
                        var ind = 0
                        row.isSelected = false;
                        selectedCategoryList.forEach(function (record) {
                            if (record.id == row.id) {
                                selectedCategoryList.splice(ind, 1);
                            }
                            ind++;
                        })
                    }
                }
            })
        }

        async function loadGridData(value, viewType, filter) {
            if (viewType == DataListToolBarEvents[DataListToolBarEvents.LightView] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    //{
                    //    width: 50, id: "isSelected", header: [{ text: "<input type='checkbox' id='selectAllCheckbox' name='selectAllCheckboxName'/>" }], htmlEnable: true,
                    //    template: function (text, row, col) {
                    //        return '<input type="checkbox" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                    //    }
                    //},
                    {
                        id: "image", header: [{ text: "Image" }], htmlEnable: true, html: "", template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true,
                    },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], width: 150, resizable: true, htmlEnable: true },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], width: 350, resizable: true, htmlEnable: true, },
                    { id: "currentStock", header: [{ text: "Current Stock" }], type: "number", width: 150, htmlEnable: false },
                    { id: "sellPrice", header: [{ text: "Sell Price" }], type: "number", width: 100, htmlEnable: false },
                    {
                        id: "isActive", header: [{ text: "Is Active" }, { content: "comboFilter" }], type: "string", width: 100, editorType: "combobox", options: ["Yes", "No"], htmlEnable: true, template: function (cellValue, row) {
                            var value = (row.isActive == true ? 'Yes' : 'No')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    { id: "taxClassName", header: [{ text: "Tax Class Name" }], htmlEnable: true, width: 150 }
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.LargeView] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    //{
                    //    width: 50, id: "isSelected", header: [{ text: "<input type='checkbox' id='selectAllCheckbox' name='selectAllCheckboxName'/>" }], htmlEnable: true,
                    //    template: function (text, row, col) {
                    //        return '<input type="checkbox" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                    //    }
                    //},
                    {
                        id: "image", header: [{ text: "Image" }], html: "", htmlEnable: true, template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true,
                    },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 150 },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 350 },
                    { id: "entityName", header: [{ text: "Entity Name" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 150 },
                    { id: "sellPrice", header: [{ text: "Sell Price" }], type: "number", htmlEnable: true, resizable: true, width: 100 },
                    { id: "shortDesc", header: [{ text: "Short Description" }], htmlEnable: true, resizable: true, width: 200 },
                    { id: "currentStock", header: [{ text: "Current Stock" }], htmlEnable: true, resizable: true, width: 100 },
                    {
                        id: "isOutOfStock", header: [{ text: "Is Out Of Stock" }, { content: "comboFilter" }], htmlEnable: true, width: 150, resizable: true, template: function (cellValue, row) {
                            var value = (row.currentStock > 0 ? 'No' : 'Yes')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    { id: "minQty", header: [{ text: "Min Qty" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 100 },
                    { id: "maxQty", header: [{ text: "Max Qty" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 100 },
                    { id: "pdpUrl", header: [{ text: "PDP URL" }/*, { content: "selectFilter" }*/], htmlEnable: true, resizable: true, width: 300 },
                    {
                        id: "isActive", htmlEnable: true, header: [{ text: "Is Active" }], resizable: true, template: function (cellValue, row) {
                            var value = (row.isActive == true ? 'Yes' : 'No')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    { id: "taxClassName", header: [{ text: "Tax Class Name" }], htmlEnable: true, resizable: true, width: 200 },
                    {
                        id: "created", header: [{ text: "Created" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, type: "date", width: 150, template: function (cellValue, row, col) {
                            return new Date(cellValue).toISOString().split('T')[0];
                        }
                    },
                    { id: "createdBy", header: [{ text: "Created By" }, { content: "selectFilter" }], htmlEnable: true, resizable: true, width: 150 },
                    {
                        id: "lastUpdated", header: [{ text: "LastUpdated" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, type: "date", width: 150, template: function (cellValue, row, col) {
                            return new Date(cellValue).toISOString().split('T')[0];
                        }
                    },
                    { id: "lastUpdatedBy", header: [{ text: "LastUpdated By" }, { content: "selectFilter" }], resizable: true, htmlEnable: true, width: 150 }
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.Delivery] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    //{
                    //    width: 50, id: "isSelected", header: [{ text: "<input type='checkbox' id='selectAllCheckbox' name='selectAllCheckboxName'/>" }], htmlEnable: true,
                    //    template: function (text, row, col) {
                    //        return '<input type="checkbox" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                    //    }
                    //},
                    {
                        id: "image", header: [{ text: "Image" }], html: "", resizable: true, htmlEnable: true, template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true,
                    },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 150 },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 350 },
                    { id: "entityName", header: [{ text: "Entity Name" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 150 },
                    { id: "currentStock", header: [{ text: "Current Stock" }], htmlEnable: true, resizable: true, adjust: false, columnAutoWidth: true, width: 150 },
                    { id: "minQty", header: [{ text: "Min Qty" }, { content: "inputFilter" }], type: "number", resizable: true, htmlEnable: true, adjust: false, columnAutoWidth: true, width: 100 },
                    { id: "weight", header: [{ text: "Weight" }], htmlEnable: true, width: 100, adjust: false, resizable: true, columnAutoWidth: true },
                    { id: "width", header: [{ text: "Width" }], htmlEnable: true, width: 100, columnAutoWidth: true, resizable: true, adjust: false },
                    { id: "height", header: [{ text: "Height" }], htmlEnable: true, width: 100, columnAutoWidth: true, resizable: true, adjust: false },
                    { id: "depth", header: [{ text: "Depth" }], htmlEnable: true, width: 100, columnAutoWidth: true, resizable: true, adjust: false },
                    {
                        id: "isOutOfStock", header: [{ text: "Is Out Of Stock" }, { content: "selectFilter" }], width: 50, htmlEnable: true, resizable: true, columnAutoWidth: true, template: function (cellValue, row) {
                            var value = (row.currentStock > 0 ? 'No' : 'Yes');
                            let html = '';
                            html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    {
                        id: "isActive", header: [{ text: "Is Active" }], width: 50, adjust: false, htmlEnable: true, resizable: true, template: function (cellValue, row) {
                            var value = (row.isActive == true ? 'Yes' : 'No')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    {
                        id: "lastUpdated", header: [{ text: "LastUpdated" }, { content: "selectFilter" }], width: 150, adjust: false, resizable: true, htmlEnable: true, type: "date", columnAutoWidth: true, template: function (cellValue, row, col) {
                            return new Date(cellValue).toISOString().split('T')[0];
                        }
                    },
                    { id: "lastUpdatedBy", header: [{ text: "LastUpdated By" }, { content: "selectFilter" }], width: 150, adjust: false, resizable: true, htmlEnable: true, columnAutoWidth: true }
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.Prices] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    //{
                    //    width: 50, id: "isSelected", header: [{ text: "<input type='checkbox' id='selectAllCheckbox' name='selectAllCheckboxName'/>" }], htmlEnable: true,
                    //    template: function (text, row, col) {
                    //        return '<input type="checkbox" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                    //    }
                    //},
                    {
                        id: "image", header: [{ text: "Image" }], htmlEnable: true, html: "", resizable: true, template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true,
                    },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 150 },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 350 },
                    { id: "sellPrice", header: [{ text: "Sell Price" }], htmlEnable: true, resizable: true, type: "number", width: 100 },
                    { id: "sellPriceExcTax", header: [{ text: "Sell Price Exc Tax" }], htmlEnable: true, resizable: true, type: "number", width: 150 },
                    { id: "costPrice", header: [{ text: "Cost Price" }], htmlEnable: true, type: "number", resizable: true, width: 100 },
                    { id: "listPrice", header: [{ text: "List Price" }], htmlEnable: true, type: "number", resizable: true, width: 100 },
                    { id: "taxClassName", header: [{ text: "Tax Rule" }], htmlEnable: true, type: "string", resizable: true, width: 150 },
                    { id: "entityName", header: [{ text: "Entity Name" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 150 }
                    //{ id: "id", header: [{ text: "ID" }], width: 300 },
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.SEOInfo] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    //{
                    //    width: 50, id: "isSelected", header: [{ text: "<input type='checkbox' id='selectAllCheckbox' name='selectAllCheckboxName'/>" }], htmlEnable: true,
                    //    template: function (text, row, col) {
                    //        return '<input type="checkbox" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                    //    }
                    //},
                    {
                        id: "image", header: [{ text: "Image" }], html: "", resizable: true, template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true, htmlEnable: true,
                    },
                    { id: "entityName", header: [{ text: "Entity Name" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 150 },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], resizable: true, htmlEnable: true, width: 150 },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 350 },
                    { id: "seoName", header: [{ text: "Seo Name" }], htmlEnable: true, type: "string", resizable: true, width: 150 },
                    { id: "metaTitle", header: [{ text: "Meta Title" }], htmlEnable: true, type: "string", resizable: true, width: 150 },
                    { id: "metaKeywords", header: [{ text: "Meta Keywords" }], htmlEnable: true, type: "string", resizable: true, width: 150 },
                    { id: "metaDescription", header: [{ text: "Meta Description" }], htmlEnable: true, type: "string", resizable: true, width: 150 },
                    { id: "seoId", header: [{ text: "Seo Id" }], htmlEnable: true, type: "number", resizable: true, width: 100 },                    
                ]);
            }

            if (filter == DataListToolBarEvents[DataListToolBarEvents.FilterHideAll]) {
                thisComponent.dataGrid.setColumns([
                    {
                        id: "image", header: [{ text: "Image" }], html: "", template: function (cellValue, row) {
                            return "<div><img title='image' src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        },
                        columnAutoWidth: true, htmlEnable: true,
                    },
                    { id: "stockCode", header: [{ text: "Stock Code" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 150 },
                    { id: "name", header: [{ text: "Name" }, { content: "inputFilter" }], htmlEnable: true, resizable: true, width: 350 }
                ]);
            }

            thisComponent.dataGrid.data.parse(value);
            thisComponent.dataGrid.paint();
            setCheckBox(selectedGridData);
        }

        function createDetailGridContainer(data, productFieldType, isDataRefreshRequired) {
            if (data == null) {
                data = [];
            }
            if (productFieldType == FieldGroupType.Collections) {
                selectedCollectionList = [];
                dynamicCollections = [];
                data.forEach(function (record) {
                    if (record.isSelected == true) {
                        dynamicCollections.push(record);
                    }
                });
                selectedCollectionList = dynamicCollections;
            }
            else {
                selectedDetailGridData = [];
                selectedDetailGridData = data;
            }
            if (data.length > 0) {
                if (isDataRefreshRequired) {
                    thisComponent.detailGrid.data.parse(data);
                    thisComponent.detailGrid.paint();
                }
                else {
                    detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
                    if (productFieldType == FieldGroupType.GiftWrap || productFieldType == FieldGroupType.Purchasibilty) {
                        thisComponent.detailGrid = new dhx.Grid(detailContainerId, { selection: "complex", adjust: false, height: 800, rowHeight: 100, autoWidth: true, htmlEnable: true /*, autoEmptyRow: true*/ });
                    }
                    else if (productFieldType == FieldGroupType.Domains) {
                        thisComponent.detailGrid = new dhx.Grid(detailContainerId, { selection: "complex", adjust: false, height: 800, rowHeight: 80, autoWidth: true, htmlEnable: true /*, autoEmptyRow: true*/ });
                    }
                    else {
                        thisComponent.detailGrid = new dhx.Grid(detailContainerId, { selection: "complex", adjust: false, height: 800, autoWidth: true, htmlEnable: true /*, autoEmptyRow: true*/ });
                    }
                    createDetailGridColumns(productFieldType);
                    thisComponent.detailGrid.data.parse(data);

                    thisComponent.layoutContainer.cell(detailContainerId).attach(thisComponent.detailGrid);
                    createDetailGridEvents();
                }
                if (productFieldType == FieldGroupType.Domains) {
                    for (var i = 0; i < data.length; i++) {
                        var record = data[i];
                        if (i != data.length - 1) {
                            var nextRecord = data[i + 1];
                            if (record.productId == nextRecord.productId)
                                thisComponent.detailGrid.addSpan({
                                    row: record.id,
                                    column: "stockCode",
                                    rowspan: 2
                                });
                        }
                    }
                }
            }
            else {
                detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
            }
        }

        function createDetailGridColumns(productFieldType) {
            switch (productFieldType) {
                case FieldGroupType.BasicInfo:
                    thisComponent.detailGrid.setColumns([
                        { id: "stockCode", header: [{ text: "Stock Code" }], resizable: true, editable: false, width: 80 },
                        { id: "name", header: [{ text: "Name" }], type: "string", resizable: true, htmlEnable: true, editable: true },
                        {
                            id: "itemType", header: [{ text: "Item Type" }], htmlEnable: true, editable: true, template: function (text, row, col) {
                                var html = '<select class="form-group" id="select' + row.productId + '" style="width:150px">';
                                for (let item in ItemTypes) {
                                    if (!isNaN(Number(item))) {
                                        html = html + ' <option value="' + ItemTypes[item] + '" ' + '" ' + (row.itemType == ItemTypes[item] ? "selected" : "") + '>' + ItemTypes[item] + '</option>'
                                    }
                                }
                                return html;
                            }
                        }
                    ]);
                    break;
                case FieldGroupType.Category:
                    thisComponent.detailGrid.setColumns([
                        { width: 80, id: "name", header: [{ text: "Name" }], htmlEnable: true },
                        {
                            width: 100, id: "isSelected", type: "string", header: [{ text: "Select Collection (Updated for all selected products)" }], htmlEnable: true,
                            template: function (text, row, col) {
                                let html = ''
                                html = html + '<input type="checkbox" class="checkboxCategoryDG" id=checkbox' + row.id + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.id + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                                return html
                            }
                        }
                    ]);
                    break;
                case FieldGroupType.Description:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "productId", header: [{ text: "Id" }] },
                        { id: "description", header: [{ text: "Description" }], htmlEnable: true, editable: true }
                    ]);
                    break;
                case FieldGroupType.Identifiers:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "productId", header: [{ text: "Id" }] },
                        { id: "sku", header: [{ text: "SKU" }], align: "left", width: 150, autoWidth: false, htmlEnable: true, resizable: true, editable: true },
                        { id: "mpn", header: [{ text: "MPN" }], align: "left", width: 150, autoWidth: false, htmlEnable: true, resizable: true, editable: true },
                        { id: "upcean", header: [{ text: "UPCEAN" }], align: "left", width: 150, autoWidth: false, htmlEnable: true, resizable: true, editable: true },
                        { id: "gtn", header: [{ text: "GTN" }], align: "left", width: 150, autoWidth: false, htmlEnable: true, resizable: true, editable: true },
                        { id: "barcode", header: [{ text: "Barcode" }], align: "left", width: 150, autoWidth: false, htmlEnable: true, resizable: true, editable: false }
                    ]);
                    break;
                case FieldGroupType.SeoInfo:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "id", header: [{ text: "Product Id" }] },
                        { id: "stockCode", header: [{ text: "StockCode" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true },
                        { id: "seoId", header: [{ text: "Seo Id" }], align: "left", type: "string", width: 100, autoWidth: false, resizable: true, htmlEnable: true },
                        { id: "seoName", header: [{ text: "Seo Name" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true, editable: true },
                        { id: "metaTitle", header: [{ text: "Meta Title" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true, editable: true },
                        { id: "metaKeywords", header: [{ text: "Meta Keywords" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true, editable: true },
                        { id: "metaDescription", header: [{ text: "Meta Description" }], align: "left", width: 200, autoWidth: false, resizable: true, htmlEnable: true, editable: true },
                        { id: "slug", header: [{ text: "URL" }], align: "left", autoWidth: false, resizable: true, htmlEnable: true, width: 400, editable: false },
                    ]);
                    break;
                case FieldGroupType.Pricing:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "id", header: [{ text: "Product Id" }] },
                        //{ id: "pricelistId", header: [{ text: "Pricelist Id" }] },
                        { id: "stockCode", header: [{ text: "StockCode" }], align: "left", autoWidth: false, resizable: true, htmlEnable: true },
                        { id: "sellPrice", header: [{ text: "Sell Price" }], align: "left", htmlEnable: true, autoWidth: false, resizable: true, width: 100, editable: true },
                        { id: "listPrice", header: [{ text: "List Price" }], align: "left", htmlEnable: true, autoWidth: false, resizable: true, width: 100, editable: true },
                        { id: "costPrice", header: [{ text: "Cost Price" }], align: "left", htmlEnable: true, width: 100, autoWidth: false, resizable: true, editable: true },
                        { id: "currencyCode", header: [{ text: "Currency Code" }], align: "left", autoWidth: false, width: 150, resizable: true, htmlEnable: true },
                        {
                            id: "taxProductClass", header: [{ text: "Tax Class Name" }], align: "left", autoWidth: false, resizable: true, htmlEnable: true, template: function (text, row, col) {
                                var html = '<select class="form-group" id="select' + row.productId + '" style="width:150px">';
                                if (row.taxProductClass != null) {
                                    row.taxProductClass.forEach(function (item) {
                                        html = html + ' <option value="' + item.key + '" ' + '" ' + (row.taxClassId == item.key ? "selected" : "") + '>' + item.value + '</option>'
                                    });
                                }
                                return html;
                            }, width: 200
                        },
                        { id: "priceEffectiveDate", header: [{ text: "Price Effective Date" }], align: "left", autoWidth: false, resizable: true, htmlEnable: true, type: "date", dateFormat: "%d/%m/%Y", editable: true, width: 200 }
                    ]);
                    break;
                case FieldGroupType.Dimensions:
                    thisComponent.detailGrid.setColumns([
                        { id: "stockCode", header: [{ text: "StockCode" }] },
                        { id: "weight", header: [{ text: "Weight(Kg)" }], type: "string", width: 100, editable: true },
                        { id: "height", header: [{ text: "Height(Cm)" }], type: "string", width: 100, editable: true },
                        { id: "width", header: [{ text: "Width(Cm)" }], type: "string", width: 100, editable: true },
                        { id: "depth", header: [{ text: "Depth(Cm)" }], type: "string", width: 100, editable: true }
                    ]);
                    break;
                case FieldGroupType.Shipping:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "productId", header: [{ text: "Product Id" }] },
                        {
                            width: 300, id: "shipping", header: [{ text: "Shipping Types" }], htmlEnable: true,
                            template: function (text, row, col) {
                                let html = '';
                                let selectedShipping = [];
                                let selectedShipTypes = {};
                                var shipping = row.shipping;
                                if (shipping != null) {
                                    for (let item in ShippingMethodTypes) {
                                        let shippingTypeId = '';
                                        if (isNaN(Number(item))) {
                                            let count = 0;
                                            shipping.forEach(function (record) {
                                                if (item == record.name) {
                                                    count++
                                                    shippingTypeId = record.id
                                                }
                                            });
                                            if (count > 0) {
                                                selectedShipTypes = { shippingType: item, isSelected: true, productId: row.productId, shippingId: shippingTypeId }
                                            }
                                            else {
                                                selectedShipTypes = { shippingType: item, isSelected: false, productId: row.productId, shippingId: shippingTypeId }
                                            }
                                            selectedShipping.push(selectedShipTypes)
                                        }
                                    }
                                }
                                if (selectedShipping != null) {
                                    selectedShipping.forEach(function (record) {
                                        if (record.shippingType != 'None') {
                                            html = html + '<input type="checkbox" class="' + record.shippingType + record.productId + ' " id=' + record.productId + ' onclick="javascript:toggleDataGridShippingCheckBox({ className :\'' + record.shippingType + '\' , id : \'' + record.productId + '\'});" value= "' + (record.isSelected == true ? true : false) + '"' + (record.isSelected == true ? "checked" : "unchecked") + ' >' + record.shippingType + '&nbsp;'
                                        }
                                    });
                                }
                                return html;
                            }
                        }
                    ]);
                    break;
                case FieldGroupType.Collections:
                    thisComponent.detailGrid.setColumns([
                        {
                            width: 50, id: "isSelected", header: [{ text: "Select Collection" }], htmlEnable: true,
                            template: function (text, row, col) {
                                let html = ''
                                html = html + '<input type="checkbox" id=checkbox' + row.key + ' onclick="javascript:toggleDataGridCheckBox({ id : \'' + row.key + '\'});" value= "' + (row.isSelected == true ? true : false) + '"' + (row.isSelected == true ? "checked" : "unchecked") + ' >'
                                return html
                            }
                        },
                        {
                            width: 100, id: "value", header: [{ text: "Name" }], htmlEnable: true,
                            template: function (text, row, col) {
                                return '<span>' + row.value + '</span>'
                            }
                        }
                    ]);
                    break;
                case FieldGroupType.GiftWrap:
                    thisComponent.detailGrid.setColumns([
                        { width: 200, id: "stockCode", header: [{ text: "Stock Code" }], htmlEnable: true, resizable: true },
                        {
                            width: 420, id: "giftWraps", header: [{ text: "Gift Wrap Settings" }], htmlEnable: true, resizable: true, template: function (text, row, col) {
                                var html = '<input type="radio" name="giftwrap' + row.productId + '" value="' + GiftWrapSettings[GiftWrapSettings.AllowGWAll] + '" /> Allow Gift Wrap.</br><input type="radio" name="giftwrap' + row.productId + '" value="' + GiftWrapSettings[GiftWrapSettings.DoNotAllowGW] + '" /> Dont Allow Gift Wrap.</br><input type= "radio" name= "giftwrap' + row.productId + '" value= "' + GiftWrapSettings[GiftWrapSettings.SelectedGW] + '" /> Selected Gift Wrap';
                                var $radios = $('input:radio[name="giftwrap' + row.productId + '"]');
                                if ($radios.is(':checked') === false) {
                                    if (row.giftWrapSettings == GiftWrapSettings.AllowGWAll && row.giftWrapOptionId == "") {
                                        $radios.filter('[value=' + GiftWrapSettings[GiftWrapSettings.AllowGWAll] + ']').prop('checked', true);
                                    }
                                    else if (row.giftWrapSettings == GiftWrapSettings.SelectedGW && row.giftWrapOptionId != "") {
                                        $radios.filter('[value=' + GiftWrapSettings[GiftWrapSettings.SelectedGW] + ']').prop('checked', true);
                                    }
                                    else {
                                        $radios.filter('[value=' + GiftWrapSettings[GiftWrapSettings.DoNotAllowGW] + ']').prop('checked', true);
                                    }
                                }
                                return html;
                            }
                        },
                        {
                            width: 150, id: "giftWrapType", header: [{ text: "Gift Wrap Type" }], template: function (text, row, col) {
                                var html = '<select class="form-group" id="selectGiftWType' + row.productId + '" style="width:100px">';
                                for (let item in GiftWrapTypes) {
                                    if (isNaN(Number(item))) {
                                        html = html + '<option value="' + GiftWrapTypes[item] + '" ' + (row.giftWrapType == GiftWrapTypes[item] ? "selected" : "") + '>' + GiftWrapTypes[GiftWrapTypes[item]] + '</option>'
                                    }
                                }
                                var $radios = $('input:radio[name="giftwrap' + row.productId + '"]');
                                if ($radios.is('[value=' + GiftWrapSettings[GiftWrapSettings.DoNotAllowGW] + ']:checked') === true) {
                                    $("#selectGiftWType" + row.productId).attr("disabled", true);
                                    return "<span>Not Applicable</span>";
                                }
                                else {
                                    $("#selectGiftWType" + row.productId).attr("disabled", false);
                                    return html;
                                }

                            }
                        },
                        {
                            width: 200, id: "giftWrapOption", header: [{ text: "Gift Wrap Option" }], htmlEnable: true, template: function (text, row, col) {
                                var $radios = $('input:radio[name="giftwrap' + row.productId + '"]');
                                var htmlDW = '<div class="form-group" style="width:150px">';
                                if (row.giftWraps != null) {
                                    var gwOp = row.giftWrapOptionId.split(',');
                                    row.giftWraps.forEach(function (gw) {
                                        var ifChecked = false;
                                        gwOp.forEach(function (item) {
                                            if (gw.key == item) {
                                                ifChecked = true;
                                            }
                                        });
                                        htmlDW = htmlDW + '<input type="checkbox" id="giftWrap' + row.productId + "-" + gw.key + '" name="giftWrap' + gw.key + '" value="' + gw.key + '" ' + ((ifChecked) ? "checked" : "") + '/><label for="giftWrap' + gw.key + '">' + gw.value + '</label><br>'
                                    });
                                    if ($radios.is('[value=' + GiftWrapSettings[GiftWrapSettings.SelectedGW] + ']:checked') === true) {
                                        return htmlDW;
                                    }
                                    else {
                                        return "<span>Not Applicable</span>";
                                    }
                                }
                            }
                        }
                    ]);
                    break;
                case FieldGroupType.Purchasibilty:
                    thisComponent.detailGrid.setColumns([
                        //{ id: "id", header: [{ text: "Product Id" }] },
                        { id: "stockCode", header: [{ text: "StockCode" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true },
                        {
                            width: 450, id: "purchasabilityType", header: [{ text: "Purchasability Settings" }], align: "left", resizable: true, autoWidth: false, htmlEnable: true, template: function (text, row, col) {
                                var html = '<input type="radio" name="purchasability' + row.productId + '" value="' + PurchasabilityType[PurchasabilityType.OnlineStore] + '" /> This product can be purchased in my online store.</br><input type="radio" name="purchasability' + row.productId + '" value="' + PurchasabilityType[PurchasabilityType.PreOrder] + '" /> This product is coming soon but i want to take pre-order.</br><input type= "radio" name= "purchasability' + row.productId + '" value= "' + PurchasabilityType[PurchasabilityType.ForwardOrder] + '" /> This product is available for forward order.';
                                var $radios = $('input:radio[name="purchasability' + row.productId + '"]');
                                if ($radios.is(':checked') === false) {
                                    if (row.purchasabilityType == PurchasabilityType[PurchasabilityType.OnlineStore]) {
                                        row.type = "";
                                        $radios.filter('[value=' + PurchasabilityType[PurchasabilityType.OnlineStore] + ']').prop('checked', true);
                                    }
                                    else if (row.purchasabilityType == PurchasabilityType[PurchasabilityType.PreOrder]) {
                                        row.type = "PreOrder";
                                        $radios.filter('[value=' + PurchasabilityType[PurchasabilityType.PreOrder] + ']').prop('checked', true);
                                    }
                                    else {
                                        row.type = "";
                                        $radios.filter('[value=' + PurchasabilityType[PurchasabilityType.ForwardOrder] + ']').prop('checked', true);
                                    }
                                }
                                return html;
                            }
                        },
                        {
                            id: "preOrder", header: [{ text: "PreOrder" }], autoWidth: false, resizable: true, htmlEnable: true, template: function (text, row, col) {
                                var $radios = $('input:radio[name="purchasability' + row.productId + '"]');
                                row.type = "";
                                if ($radios.is('[value=' + PurchasabilityType[PurchasabilityType.PreOrder] + ']:checked') === true) {
                                    row.type = "PreOrder";
                                    return '<button type="button" class="btn btn-primary btn-sm mt-2" id ="preOrder' + row.id + '">Pre-order Configuration</button>';
                                }
                                else {
                                    $("#preOrder" + row.id).remove();
                                    return '<span>Not Applicable</span>';
                                }
                            }, width: 200
                        }
                    ]);
                    break;
                case FieldGroupType.Domains:
                    thisComponent.detailGrid.setColumns([
                        { id: "stockCode", header: [{ text: "StockCode" }], align: "left", width: 100, autoWidth: true, resizable: true, htmlEnable: true },
                        { id: "domainName", header: [{ text: "Domain" }], align: "left", width: 150, autoWidth: false, resizable: true, htmlEnable: true },
                        {
                            width: 50, id: "isActive", header: [{ text: "Active" }], htmlEnable: true,
                            template: function (text, row, col) {
                                var htmlDom = '<div class="checkbox checkbox-success checkbox-single" style="width:150px">';
                                var ifChecked = false;
                                if (row.isActive) {
                                    ifChecked = true;
                                }
                                htmlDom = htmlDom + '<input type="checkbox" id="active' + row.domainId + "-" + row.productId + '" name="domain' + row.domainId + "-" + row.productId + '" value="' + row.isActive + '" ' + ((ifChecked) ? "checked" : "") + '/><label for="active' + row.domainId + "-" + row.productId + '"></label><br></div>';
                                return htmlDom;
                            }
                        },
                        {
                            width: 50, id: "isVisible", header: [{ text: "Visible" }], htmlEnable: true,
                            template: function (text, row, col) {
                                var htmlDom = '<div class="checkbox checkbox-success checkbox-single" style="width:150px">';
                                var ifChecked = false;
                                if (row.isVisible) {
                                    ifChecked = true;
                                }
                                htmlDom = htmlDom + '<input type="checkbox" id="visible' + row.domainId + "-" + row.productId + '" name="domain' + row.domainId + "-" + row.productId + '" value="' + row.isActive + '" ' + ((ifChecked) ? "checked" : "") + '/><label for="visible' + row.domainId + "-" + row.productId + '"></label><br></div>';
                                return htmlDom;
                            }
                        },
                        {
                            width: 50, id: "sellWithoutInventory", header: [{ text: "Backorder" }], htmlEnable: true,
                            template: function (text, row, col) {
                                var htmlDom = '<div class="checkbox checkbox-success checkbox-single" style="width:150px">';
                                var ifChecked = false;
                                if (row.sellWithoutInventory) {
                                    ifChecked = true;
                                }
                                htmlDom = htmlDom + '<input type="checkbox" id="sellWithoutInventory' + row.domainId + "-" + row.productId + '" name="domain' + row.domainId + "-" + row.productId + '" value="' + row.isActive + '" ' + ((ifChecked) ? "checked" : "") + '/><label for="sellWithoutInventory' + row.domainId + "-" + row.productId + '"></label><br></div>';
                                return htmlDom;
                            }
                        },
                        {
                            width: 80, id: "excludeFromShoppingFeed", header: [{ text: "Shopping Feed" }], htmlEnable: true,
                            template: function (text, row, col) {
                                var htmlDom = '<div class="custom-control custom-switch" style="width:150px">';
                                var ifChecked = false;
                                if (row.excludeFromShoppingFeed) {
                                    ifChecked = true;
                                }
                                htmlDom = htmlDom + '<input type="checkbox" class="custom-control-input" id="excludeFromShoppingFeed' + row.domainId + "-" + row.productId + '" name="domain' + row.domainId + "-" + row.productId + '" value="' + row.isActive + '" ' + ((ifChecked) ? "checked" : "") + '/><label class="custom-control-label" for="excludeFromShoppingFeed' + row.domainId + "-" + row.productId + '"></label><br>';
                                return htmlDom;
                            }
                        },
                        {
                            width: 80, id: "preOrder", header: [{ text: "PreOrder" }], htmlEnable: true,
                            template: function (text, row, col) {
                                row.selectedTabField = "Domains";
                                var htmlDom = '<div class="col-12 col-sm-12"><div class="custom-control custom-switch col-12 col-sm-12" style="width:150px">';
                                var preOrder = $("input[id=preOrderDomains" + row.domainId + "-" + row.productId + "]:checked");
                                var selectedBackOrder = (preOrder.length > 0) ? ((preOrder[0].value === "true") ? true : false) : false;
                                if (!row.isMaster) {
                                    var ifChecked = false;
                                    if (row.preOrder == true) {
                                        ifChecked = true;
                                    }
                                    htmlDom = htmlDom + '<input type="checkbox" class="custom-control-input" id="preOrderDomains' + row.domainId + "-" + row.productId + '" name="preOrderDomains' + row.domainId + "-" + row.productId + '" value="' + row.isActive + '" ' + ((ifChecked) ? "checked" : "") + '/><label class="custom-control-label" for="preOrderDomains' + row.domainId + "-" + row.productId + '"></label><br>';
                                    if (selectedBackOrder) {
                                        htmlDom = htmlDom + '<div class="col-12 col-sm-12 form-group" style="margin-left:-50px;">' +
                                            '<label>Max Stock</label>' +
                                            '<input type="text" id="preOrderMaxStock' + row.domainId + "-" + row.productId + '" name = "preOrderMaxStock' + row.domainId + "-" + row.productId + '" value = "' + row.maxStock + '" ><br></div>';
                                    }
                                }
                                else {
                                    htmlDom = '<span>Not Applicable</span>';
                                }
                                return htmlDom;
                            }
                        }
                    ]);
                    break;
            }
        }

        function createDetailGridEvents() {
            thisComponent.detailGrid.events.on("CellClick", async function (row, column, e) {
                selectedDetailGridRecord = [];
                selectedDetailGridRecord = row;
                var column = column.header[0].text;
                var preOrderButton = $("#preOrder" + row.id);
                var $radios = $('input:radio[name="purchasability' + row.productId + '"]');
                if (row.mediaType == "Image" && column == "Action") {
                    if (isUpdateInProcess == false) {
                        dhx.confirm({
                            header: "Delete Image",
                            text: "Are you sure you want to delete this Image?",
                            buttons: ["Ok", "Cancel"]
                        }).then(async function (answer) {
                            isUpdateInProcess = true;
                            if (answer) {
                                var response = await removeImage(row.productId, row);
                                if (response) {
                                    dhx.message({
                                        text: "Image deleted !!",
                                        expire: 3000,
                                        type: "customCss"
                                    });
                                    isUpdateInProcess = false;
                                    createMediaContainers("Image", true);
                                }
                            }
                            else {
                                isUpdateInProcess = false;
                            }
                        });
                    }
                }
                else if ((row.type = "PreOrder") && (Object.keys(preOrderButton).length !== 0) && ($radios.is('[value=' + PurchasabilityType[PurchasabilityType.PreOrder] + ']:checked') === true)) {
                    if (preOrderFormCreated == false) {
                        var formPreOrder = new dhx.Form("form_container_preOrder", {
                            rows: [
                                {
                                    id: "productId",
                                    type: "input",
                                    label: "Product Id",
                                    labelInline: true,
                                    labelWidth: "100px",
                                    hidden: true
                                },
                                {
                                    id: "shortMessage",
                                    type: "textarea",
                                    label: "Short Message",
                                    labelInline: true,
                                    labelWidth: "100px",
                                    hidden: false
                                },
                                {
                                    id: "maxStock",
                                    type: "input",
                                    label: "Max Stock",
                                    labelInline: true,
                                    labelWidth: "100px",
                                    hidden: false
                                },
                                {
                                    id: "launchDateString",
                                    type: "datepicker",
                                    label: "Launch Date",
                                    labelInline: true,
                                    labelWidth: "100px",
                                    placeholder: "Select Date",
                                    dateFormat: "%m/%d/%Y",
                                    enableTime: false,
                                    enableTodayButton: true,
                                    hidden: false
                                },
                                {
                                    align: "end",
                                    cols: [
                                        {
                                            gravity: true,
                                            type: "button",
                                            submit: true,
                                            value: "Save",
                                            size: "medium",
                                            view: "flat",
                                            color: "primary",
                                            id: "button",
                                            name: "button",
                                            method: "POST",
                                            asFormData: true,
                                            url: url + 'SavePreOrderInfo'
                                        }
                                    ]
                                }
                            ]
                        });
                        if (row.productId != null) {
                            formPreOrder.setValue({
                                "productId": row.productId
                            });
                        }
                        if (row.launchDate != null) {
                            var date = new Date(row.launchDate);
                            var output = new Intl.DateTimeFormat('en-US').format(date).toString();
                            formPreOrder.setValue({
                                "launchDateString": output
                            });
                        }
                        if (row.shortMessage != null) {
                            var message = row.shortMessage;
                            formPreOrder.setValue({
                                "shortMessage": message
                            });
                        }
                        if (row.maxStock != null) {
                            formPreOrder.setValue({
                                "maxStock": row.maxStock.toString()
                            });
                        }

                        //Create a window to attach form
                        var dhxWindowPreOrder = new dhx.Window({
                            header: "Pre-Order",
                            modal: true,
                            resizable: true,
                            movable: true,
                            width: 500,
                            height: 400,
                            closable: true,
                            title: "Pre-Order Configuration"
                        });
                        dhxWindowPreOrder.attach(formPreOrder);
                        dhxWindowPreOrder.show();

                        preOrderFormCreated = true;
                        dhxWindowPreOrder.events.on("AfterHide", function (id) {
                            preOrderFormCreated = false;
                        });

                        formPreOrder.events.on("BeforeSend", function () {
                            var state = formPreOrder.getValue();
                            if (state != null) {
                                row.productId = state.productId;
                                row.launchDateString = state.launchDateString;
                                row.shortMessage = state.shortMessage;
                                row.maxStock = state.maxStock;
                            }
                        });
                        formPreOrder.events.on("AfterSend", async function () {
                            dhxWindowPreOrder.hide();
                            var text = "Product(s) " + FieldGroupType[toolBarTabField].toLowerCase() + " updated !!!";
                            dhx.message({
                                text: text,
                                expire: 3000,
                                type: "customCss"
                            });
                            await refreshDetailGrid(false);
                            //createMediaContainers("Video", true);
                        });
                    }

                }
                else if (row.selectedTabField == "Domains") {
                    var preOrder = $("input[id=preOrderDomains" + row.domainId + "-" + row.productId + "]:checked");
                    var selectedBackOrder = (preOrder.length > 0) ? ((preOrder[0].value === "true") ? true : false) : false;
                    if (selectedBackOrder == false) {
                        row.preOrder = false;
                    }
                    else {
                        row.preOrder = true;
                    }
                }
            });
        }

        function createChildGridEvents() {
            thisComponent.childGrid.events.on("CellClick", async function (row, column, e) {
                selectedDetailGridRecord = [];
                selectedDetailGridRecord = row;
                var column = column.header[0].text;
                if (row.mediaType == "Video" && column == "Action") {
                    if (isUpdateInProcess == false) {
                        dhx.confirm({
                            header: "Delete Url",
                            text: "Are you sure you want to delete this Url?",
                            buttons: ["Ok", "Cancel"]
                        }).then(async function (answer) {
                            isUpdateInProcess = true;
                            if (answer) {
                                var response = await removeUrl(row.productId, row);
                                if (response.isValid) {
                                    dhx.message({
                                        text: "Url deleted !!",
                                        expire: 3000,
                                        type: "customCss"
                                    });
                                    isUpdateInProcess = false;
                                    createMediaContainers("Video", true);
                                }
                            }
                            else {
                                isUpdateInProcess = false;
                            }
                        });
                    }
                }
            });
        }

        async function refreshDataGrid(selected) {
            if (selectedTreeItem.id != 0 && selectedTreeItem.type != '') {
                products = await getProducts(selectedTreeItem.type, selectedTreeItem.id);
                rawProduct = Object.assign([], products);
                setCheckBox(selected);
                loadGridData(products, viewType, "");
                products.forEach(function (record) {
                    if (record.isSelected) {
                        thisComponent.dataGrid.addRowCss(record.id, "myCustomSelectionClass");
                    }
                });
            }
        }

        async function refreshDetailGrid(isDataRefreshRequired) {
            if (selectedGridData.length > 0) {
                let productIds = selectedGridData.map(function (record) { return record.id }).join(",");
                let result = await getProductFieldInfo(toolBarTabField, productIds);
                createDetailGridContainer(result, toolBarTabField, isDataRefreshRequired);
            }
            else {
                createDetailGridContainer([], toolBarTabField, isDataRefreshRequired);
            }
        }

        async function getTreeDataJson() {
            let treeData = await getProductGroupTree();
            return treeData;
        }

        //Create Media Containers
        async function createMediaContainers(mediaType, isDataPaintRequired) {
            rawMediaData = [];
            let selectedProductIds = selectedGridData.map(function (record) { return record.id }).join(",");
            let result = await getProductFieldInfo(toolBarTabField, selectedProductIds);
            if (result.length == 0) {
                result = []
            }
            rawMediaData = result;

            if (mediaType == "Image") {
                createImageContainer(result, isDataPaintRequired);
            }
            else if (mediaType == "Video") {
                createVideoContainer(result, isDataPaintRequired);
            }
            else {
                createVideoContainer(result, isDataPaintRequired);
                createImageContainer(result, isDataPaintRequired);
            }
        }

        async function createImageContainer(result, isDataPaintRequired) {
            let imageList = [];
            result.forEach(function (record) {
                if (record.mediaType == "Image") {
                    imageList.push(record);
                }
            });
            selectedImageList = imageList;
            if (isDataPaintRequired) {
                thisComponent.detailGrid.data.parse(selectedImageList);
                thisComponent.detailGrid.paint();
            }
            else {
                var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
                thisComponent.layoutContainer.removeCell(detailContainerId);
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "Image Section", autoWidth: true, height: 400, rows: [] }, detailContainerId);
                //Image 
                await createImageRows(selectedImageList);
                createDetailGridEvents();
            }
        }

        async function createVideoContainer(result, isDataPaintRequired) {
            let videoList = [];
            result.forEach(function (record) {
                if (record.mediaType == "Video") {
                    videoList.push(record);
                }
            });
            selectedVideoList = videoList;
            if (isDataPaintRequired) {
                thisComponent.childGrid.data.parse(selectedVideoList);
                thisComponent.childGrid.paint();
            }
            else {
                var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
                thisComponent.layoutContainer.removeCell(videoContainerId);
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: videoContainerId, header: "Videos Section", autoWidth: true, height: 400, rows: [] }, videoContainerId);
                //Video
                await createVideoRows(selectedVideoList);
                createChildGridEvents();
            }
        }

        async function createImageRows(dataSet) {
            thisComponent.detailGrid = new dhx.Grid(detailContainerId, {
                columns: [
                    { id: "stockCode", header: [{ text: "Stock Code" }] },
                    {
                        id: "image", header: [{ text: "Image" }], template: function (cellValue, row) {
                            return "<div><img src=" + cellValue + " height=" + 40 + " width=" + 40 + "/></div>";
                        }
                    },
                    { id: "mediaType", header: [{ text: "Media Type" }] },
                    { id: "displayOrder", header: [{ text: "Display Order" }], type: "number", width: 100, editable: true },
                    {
                        id: "isDefault", header: [{ text: "Is Default" }, { content: "comboFilter" }], type: "string", editable: true, template: function (cellValue, row) {
                            var value = (row.isDefault == true ? 'checked' : '');
                            let html = '';
                            html = '<input type="radio" value="' + row.id + '" name="imageMediaGroup' + row.stockCode + '" ' + value + '>'
                            return html
                        }
                    },
                    { id: "isActive", header: [{ text: "Is Active" }, { content: "comboFilter" }], type: "boolean", editable: true },
                    {
                        id: "action", header: [{ text: "Action" }], template: function (cellValue, row) {
                            return '<a href="javascript:void(0)"><i class="icon-trash action-icon text-danger"></i></a>';
                        }
                    }
                ],
                data: dataSet, height: 350, htmlEnable: true,
                selection: "cell", multiselection: true, multiselectionmode: "click", adjust: false, autoWidth: true
            });
            thisComponent.layoutContainer.cell(detailContainerId).attach(thisComponent.detailGrid);
            thisComponent.detailGrid.events.on("FilterChange", function (value, colId, filter) {
                console.log("You've entered " + value + " into the " + colId + " column");
            });
        }

        async function createVideoRows(dataSet) {
            thisComponent.childGrid = new dhx.Grid(videoContainerId, {
                columns: [
                    //{ id: "id", header: [{ text: "Id" }] },
                    //{ id: "productId", header: [{ text: "Product Id" }] },
                    { id: "stockCode", header: [{ text: "Stock Code" }] },
                    {
                        id: "url", header: [{ text: "Video" }], template: function (cellValue, row) {
                            return "<div>" + row.url + "</div>";
                        }, editable: true, width: 250
                    },
                    { id: "mediaType", header: [{ text: "Media Type" }], editable: true, editorType: "select", options: ["Video"] },
                    { id: "displayOrder", header: [{ text: "Display Order" }], width: 100, editable: true },
                    {
                        id: "isDefault", header: [{ text: "Is Default" }, { content: "comboFilter" }], type: "string", editable: true, template: function (cellValue, row) {
                            var value = (row.isDefault == true ? 'checked' : '');
                            let html = '';
                            html = '<input type="radio" value="' + row.id + '" name="videoMediaGroup' + row.stockCode + '" ' + value + '>'
                            return html
                        }
                    },
                    { id: "isActive", header: [{ text: "Is Active" }, { content: "comboFilter" }], type: "boolean", editable: true },
                    {
                        id: "action", header: [{ text: "Action" }], template: function (cellValue, row) {
                            return '<a href="javascript:void(0)"><i class="icon-trash action-icon text-danger"></i></a>';
                        }
                    }
                ],
                data: dataSet, height: 350, htmlEnable: true,
                selection: "cell", multiselection: true, multiselectionmode: "click", adjust: false, autoWidth: true, autoEmptyRow: false
            });
            thisComponent.layoutContainer.cell(videoContainerId).attach(thisComponent.childGrid);
        }

        //Create Collection Containers
        async function createCollectionContainers(isDataRefreshRequired) {
            await refreshDetailGrid(isDataRefreshRequired);
            if (isDataRefreshRequired == false) {
                createCollectionSelectEvents();
            }
        }

        //Create Rich Text Containers
        async function createMultipleRichTextContainers() {
            var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
            thisComponent.layoutContainer.removeCell(detailContainerId);
            thisComponent.layoutContainer.removeCell(videoContainerId);
            thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "", autoWidth: false, css: "richTextCss", rows: [] }, detailContainerId);
            //From API
            if (selectedGridData.length > 0) {
                let selectedProductIds = selectedGridData.map(function (record) { return record.id }).join(",");
                selectedDetailGridData = await getProductFieldInfo(toolBarTabField, selectedProductIds);
                selectedDetailGridData.forEach(async function (record) {
                    //var data = record;
                    let descriptionObj = { productId: record.productId, desc: { shortDescription: record.shortDescription, longDescription: record.description, notes: record.notes } };
                    richDescriptions.unshift(descriptionObj);
                    await createRichTextRows(record);
                })
            }

            richTextEvents(selectedDetailGridData);
        }

        async function createRichTextRows(record) {
            //Notes
            thisComponent.layoutContainer.cell(detailContainerId).addCell({ id: "notes" + record.productId, header: "Notes - " + record.stockCode, autoWidth: false }, "notes" + record.productId);
            var containerN = "notes" + record.productId;
            var containerNotes = new dhx.Richtext(thisComponent.layoutContainer.cell(containerN), {
                mode: "classic",
                enableAutoWidth: true,
                autoWidth: true,
                toolbarBlocks: [
                    "undo", "style", "decoration", "colors", "align",
                    "link", "clear", "stats"
                ]
            });
            if (record != null) {
                var notes = record.notes != null ? record.notes : "";
                containerNotes.setValue(notes);
            }
            thisComponent[containerN] = containerNotes;

            //Long Description
            thisComponent.layoutContainer.cell(detailContainerId).addCell({ id: "long" + record.productId, header: "Long Description - " + record.stockCode, autoWidth: false }, "long" + record.productId);
            var containerL = "long" + record.productId;
            var containerLong = new dhx.Richtext(thisComponent.layoutContainer.cell(containerL), {
                mode: "classic",
                enableAutoWidth: true,
                autoWidth: true,
                toolbarBlocks: [
                    "undo", "style", "decoration", "colors", "align",
                    "link", "clear", "stats"
                ]
            });
            if (record != null) {
                var longDescription = record.description != null ? record.description : "";
                containerLong.setValue(longDescription);
            }
            thisComponent[containerL] = containerLong;

            //Short Description
            thisComponent.layoutContainer.cell(detailContainerId).addCell({ id: "short" + record.productId, header: "Short Description - " + record.stockCode, autoWidth: false }, "short" + record.productId);
            var containerS = "short" + record.productId
            var containerShort = new dhx.Richtext(thisComponent.layoutContainer.cell(containerS), {
                mode: "classic",
                enableAutoWidth: true,
                autoWidth: true,
                toolbarBlocks: [
                    "undo", "style", "decoration", "colors", "align",
                    "link", "clear", "stats"
                ]
            });
            if (record != null) {
                var shortDescription = record.shortDescription != null ? record.shortDescription : "";
                containerShort.setValue(shortDescription);
            }
            thisComponent[containerS] = containerShort;
        }

        //Create GridTree Containers
        async function createGridTreeContainer(isDataRefreshRequired) {
            selectedCategoryList = [];
            rawCategoryList = [];
            let selectedProductIds = selectedGridData.map(function (record) { return record.id }).join(",");
            let result = await getProductFieldInfo(toolBarTabField, selectedProductIds);
            rawCategoryList = result;
            if (result == null) {
                result = [];
            }
            result.forEach(async function (record) {
                if (record.isSelected == true) {
                    selectedCategoryList.push(record);
                }
            });
            if (isDataRefreshRequired) {
                thisComponent.detailGrid.data.parse(result);
                thisComponent.detailGrid.paint();
            }
            else {
                detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
                thisComponent.detailGrid = new dhx.TreeGrid(detailContainerId, {
                    selection: true,
                    height: 800,
                    columnAutoWidth: false,
                    autoWidth: true
                });
                createDetailGridColumns(toolBarTabField);
                thisComponent.detailGrid.data.parse(result);
                thisComponent.layoutContainer.cell(detailContainerId).attach(thisComponent.detailGrid);
                createCategorySelectEvents();
            }
        }

        //Create Brands/Subbrands Container 
        async function createBrandsContainers() {
            let brandsSubBrandsList = []
            var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
            thisComponent.layoutContainer.removeCell(detailContainerId);
            thisComponent.layoutContainer.removeCell(videoContainerId);
            thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "", autoWidth: false, rows: [] }, detailContainerId);
            let selectedProductIds = selectedGridData.map(function (record) { return record.id }).join(",");
            thisComponent.detailGrid = new dhx.Tree(thisComponent.layoutContainer.cell(detailContainerId), {
                icon: {
                    folder: "fa fa-folder",
                    openFolder: "fa fa-folder-open",
                    file: "fa fa-file"
                },
                checkbox: true,
                css: "treeCss"
            });
            let brandsList = await getProductFieldInfo(toolBarTabField, selectedProductIds);
            thisComponent.detailGrid.data.parse(brandsList);
            //thisComponent.detailGrid.openAll();
        }

        //Detach particular cell 
        function detachLayoutContainerObject(id, component, data) {
            if (component != undefined) {
                if (componentType.type == 2) {
                    var parent = thisComponent.layoutContainer.cell(id).getParent();
                    thisComponent.layoutContainer.removeCell(id);
                    thisComponent.layoutContainer.removeCell(videoContainerId);
                    thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "", autoWidth: false }, detailContainerId);
                }
                if (componentType.type != 2) {
                    var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
                    thisComponent.layoutContainer.removeCell(detailContainerId);
                    thisComponent.layoutContainer.removeCell(videoContainerId);
                    thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "", autoWidth: false }, detailContainerId);
                }
            }
        }

        function createTreeDataLayout(data) {
            var parent = thisComponent.layoutContainer.cell(treeContainerId).getParent();
            thisComponent.layoutContainer.removeCell(treeContainerId);
            thisComponent.layoutContainer.removeCell(toolbarContainerTree);
            if (data.length > 0)
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: treeContainerId, header: "Tree for - " + data[0].entityName, autoWidth: false, rows: [] }, treeContainerId);
            else
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: treeContainerId, header: "Tree for - ", autoWidth: false, rows: [] }, treeContainerId);
            thisComponent.layoutContainer.cell(parent.id).addCell({ id: toolbarContainerTree, header: "", autoWidth: false, rows: [] }, toolbarContainerTree);
            thisComponent.layoutContainer.cell(treeContainerId).attach(thisComponent.groupTree);
            thisComponent.layoutContainer.cell(toolbarContainerTree).attach(thisComponent.toolBarTree);
        }

        function createGridDataLayout(data) {
            var parent = thisComponent.layoutContainer.cell(dataGridContainerId).getParent();
            thisComponent.layoutContainer.removeCell(dataGridContainerId);
            thisComponent.layoutContainer.removeCell(toolbarContainerList);
            if (data.length > 0)
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: dataGridContainerId, header: "Products for - " + data[0].entityName, height: 800, autoWidth: false, rows: [] }, dataGridContainerId);
            else
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: dataGridContainerId, header: "Products for - ", height: 800, autoWidth: false, rows: [] }, dataGridContainerId);
            thisComponent.layoutContainer.cell(parent.id).addCell({ id: toolbarContainerList, header: "", autoWidth: false, rows: [] }, dataGridContainerId);
            thisComponent.layoutContainer.cell(dataGridContainerId).attach(thisComponent.dataGrid);
            thisComponent.layoutContainer.cell(toolbarContainerList).attach(thisComponent.toolBarDataGrid);

        }

        async function createProductsSectionGrid(dataSet) {
            if (dataSet == null) {
                dataSet = [];
            }
            thisComponent.childGrid.setColumns([
                { width: 250, id: "id", header: [{ text: "Id" }], htmlEnable: true, hidden: true },
                { width: 200, id: "productName", header: [{ text: "Product Name" }], htmlEnable: true, type: "string", editable: false },
                { width: 100, id: "productStockCode", header: [{ text: "Product Stock Code" }], htmlEnable: true, type: "string", editable: false },
                { width: 100, id: "qty", header: [{ text: "Quantity" }], htmlEnable: true, type: "number", editable: false },
                { width: 150, id: "returnQty", header: [{ text: "Qty Returned" }], htmlEnable: true, type: "number" },
                { width: 150, id: "onHandQty", header: [{ text: "Current Stock" }], htmlEnable: true, type: "number", editable: false },
                { width: 150, id: "priceWithoutTax", header: [{ text: "Price Without Tax" }], htmlEnable: true, type: "number" },
                { width: 100, id: "lineTotal", header: [{ text: "Line Total" }], htmlEnable: true, type: "number", editable: false },
                { width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "date", editable: false },
                { width: 200, id: "createdBy", header: [{ text: "Created By" }], htmlEnable: true, type: "string", editable: false },
                { width: 150, id: "lastUpdated", header: [{ text: "LastUpdated" }], htmlEnable: true, type: "date", editable: false },
                { width: 200, id: "lastUpdatedBy", header: [{ text: "LastUpdated By" }], htmlEnable: true, type: "string", editable: false }
            ]);
            thisComponent.childGrid.data.parse(dataSet);
            createOrderProductToolbarEvents();
        }


        /******************************************************* Orders Section ***************************************/


        //Orders Section
        async function createMainOrdersContainer() {
            selectedMainContainer = HeaderToolBar.Orders;
            var container = { treeHeader: 'Filters', gridHeader: 'Orders', detailHeader: 'Properties' }
            //Detach any old implementation
            detachMainContainers([], container);

            let toolBarTreeFilters = [
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeRefresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Tree"
                },
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeExpandAll],
                    value: "Expand",
                    type: "navItem",
                    icon: "fa fa-expand",
                    tooltip: "Expand Tree"
                },
                {
                    id: TreeToolBarEvents[TreeToolBarEvents.TreeCollapseAll],
                    value: "Collapse",
                    type: "navItem",
                    icon: "fa fa-compress",
                    tooltip: "Collapse Tree"
                }
            ];

            let toolBarDataOrders = [
                {
                    type: "block",
                    direction: "col",
                    "items": [{

                        id: "datalistView",
                        type: "selectButton",
                        value: "Light View",
                        tooltip: "View Types",
                        size: "small",
                        items: [
                            {
                                id: DataListToolBarEvents[DataListToolBarEvents.LightView],
                                //type: "button",
                                value: "Light View",
                                tooltip: "Summarised View",
                                twoState: true
                            },
                            {
                                id: DataListToolBarEvents[DataListToolBarEvents.LargeView],
                                //type: "button",
                                value: "Large View",
                                tooltip: "Large View",
                                twoState: true
                            },
                            {
                                id: DataListToolBarEvents[DataListToolBarEvents.Delivery],
                                //type: "button",
                                value: "Delivery",
                                tooltip: "Delivery",
                                twoState: true
                            }

                        ]
                    }]
                },
                {
                    type: "separator"
                },
                {
                    type: "block",
                    direction: "col",
                    "items": [
                        {
                            id: DataListToolBarEvents[DataListToolBarEvents.Filter],
                            type: "selectButton",
                            icon: "fa fa-filter",
                            value: "Filter",
                            tooltip: "Filter Columns",
                            size: "small",
                            items: [
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterReset],
                                    //type: "button",
                                    value: "Reset All",
                                    tooltip: "Reset All"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterShowAll],
                                    //type: "button",
                                    icon: "fa fa-plus",
                                    value: "Show All",
                                    tooltip: "Show All"
                                },
                                {
                                    id: DataListToolBarEvents[DataListToolBarEvents.FilterHideAll],
                                    //type: "button",
                                    icon: "fa fa-minus",
                                    value: "Hide All",
                                    tooltip: "Hide All"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: DataListToolBarEvents[DataListToolBarEvents.ListRefresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Item"
                },
                {
                    id: DataListToolBarEvents[DataListToolBarEvents.GridExport],
                    value: "Export",
                    type: "navItem",
                    icon: "fa fa-file-excel-o",
                    tooltip: "Export Excel"
                }
            ];

            let toolBarDetailProperties = [
                {
                    type: "block",
                    direction: "col",
                    "items": [{
                        id: "select",
                        type: "selectButton",
                        icon: "mdi mdi-information",
                        value: "BasicInfo",
                        tooltip: "Select Operations",
                        items: [
                            {
                                id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.BasicInfo],
                                //type: "button",
                                icon: "mdi mdi-information",
                                value: "BasicInfo",
                                tooltip: "BasicInfo",
                                twoState: true
                            },
                            {
                                id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Products],
                                //type: "button",
                                icon: "fa fa-product-hunt",
                                value: "Products",
                                tooltip: "Products",
                                twoState: true
                            },
                            {
                                id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Messages],
                                //type: "button",
                                icon: "fa fa-bars",
                                value: "Order Notes",
                                tooltip: "Order Comments/Notes",
                                twoState: true
                            },
                            {
                                id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.History],
                                //type: "button",
                                icon: "fa fa-history",
                                value: "Order Logs",
                                tooltip: "Product Description",
                                twoState: true
                            },
                            {
                                id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.OrderProducts],
                                //type: "button",
                                icon: "fas fa-list",
                                value: "OrderProducts",
                                tooltip: "Orders and their Products",
                                twoState: true
                            }
                        ]
                    }]
                },
                {
                    type: "separator"
                },
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Refresh],
                    value: "Refresh",
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Details"
                },
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save],
                    value: "Save",
                    type: "navItem",
                    icon: "fa fa-save",
                    tooltip: "Save Details",
                    size: "small"
                },
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel],
                    value: "Export",
                    type: "navItem",
                    icon: "fa fa-file-excel-o",
                    tooltip: "Export Excel",
                    size: "small"
                },
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus],
                    value: "Update Order",
                    type: "navItem",
                    icon: "mdi mdi-square-edit-outline",
                    tooltip: "Update Order Status",
                    size: "small"
                }
            ];

            //Toolbar Tree Catalogue
            thisComponent.toolBarTree = new dhx.Ribbon(toolbarContainerTree, { css: "toolBarDetailCss" });
            thisComponent.toolBarTree.data.parse(toolBarTreeFilters);
            thisComponent.layoutContainer.cell(toolbarContainerTree).attach(thisComponent.toolBarTree);

            //Toolbar Products Catalogue
            thisComponent.toolBarDataGrid = new dhx.Ribbon(toolbarContainerList, { css: "toolBarDetailCss" });
            thisComponent.toolBarDataGrid.data.parse(toolBarDataOrders);
            thisComponent.layoutContainer.cell(toolbarContainerList).attach(thisComponent.toolBarDataGrid);

            //Toolbar Products Detail
            thisComponent.toolBarDetailGrid = new dhx.Ribbon(toolbarContainerDetail, { css: "toolBarDetailCss" });
            thisComponent.toolBarDetailGrid.data.parse(toolBarDetailProperties);
            thisComponent.layoutContainer.cell(toolbarContainerDetail).attach(thisComponent.toolBarDetailGrid);


            //Create Grid Container
            thisComponent.dataGrid = new dhx.Grid(dataGridContainerId, { selection: "row", keyNavigation: true, multiselection: true, adjust: false, autoWidth: false, htmlEnable: true });

            thisComponent.groupTree = new dhx.Tree(thisComponent.layoutContainer.cell(treeContainerId), {
                icon: {
                    folder: "fa fa-folder",
                    openFolder: "fa fa-folder-open",
                    file: "fa fa-folder"
                },
                checkbox: true
            });

            //Call Tree Container to load tree
            await createOrdersTreeContainer();

            thisComponent.layoutContainer.cell(treeContainerId).attach(thisComponent.groupTree);



            await createOrderTreeEvents();
            await createOrdersToolbarEvents();
            await createOrderGridEvents();
        }

        async function createOrdersTreeContainer() {
            ordersTreeData = [];
            ordersTreeData = await getOrdersTree();
            thisComponent.groupTree.data.parse(ordersTreeData);

            //Forcefully remove checkbox from second tree array (OrderPeriod) as no method for setting checkbox 
            //to particular tree item in dhtmlx 6.1.4
            var treeRootName = $(thisComponent.groupTree.data)[0]._root;
            var treeChilds = $(thisComponent.groupTree.data._childs)[0];
            $(treeChilds[treeRootName][1]).prop("checkbox", false);
            $(treeChilds["9090"]).prop("checkbox", false);
        }

        async function createOrderTreeEvents() {
            let orderGroup = '';
            let selectedIds = '';
            let dates = { fromDate: '', toDate: '' };
            let parentMark = 0;

            thisComponent.groupTree.events.on("change", async function (id, e) {
                switch (orderGroup) {
                    case OrderGroupTypes[OrderGroupTypes.OrderStatus]:
                        //Handling done explicitly for Checkbox click on Order Tree for checkind parent and childs
                        //multiple scenarios as no checked event given for the tree checkbox
                        var treeRootName = $(thisComponent.groupTree.data)[0]._root;
                        var treeChilds = $(thisComponent.groupTree.data._childs)[0];
                        var parentObj = $(treeChilds[treeRootName][0]);
                        var itemChecked = 0;
                        parentObj[0].items.forEach(function (item) {
                            if (item.$mark == 1)
                                itemChecked++;
                        });
                        if ((parentObj[0].$mark == 1 && itemChecked == 0) || (parentObj[0].$mark == 0 && parentMark == 2)) {
                            parentObj[0].items.forEach(function (item) {
                                item.$mark = parentObj[0].$mark;
                            });
                        }
                        if ((parentMark == 0 || parentMark == 2) && thisComponent.groupTree.getChecked().length > 0)
                            parentMark = 2;
                        else
                            parentMark = 0;
                        //ends here
                        checkedData = [];
                        selectedDetailGridData = [];
                        createOrderDetailGridContainer(selectedDetailGridData);
                        let checkedIds = thisComponent.groupTree.getChecked();
                        let index = 0;
                        checkedIds.forEach(function (record) {
                            if (record == parentObj[0].id) {
                                checkedIds.splice(index, 1);
                            }
                            index++
                        });
                        selectedIds = checkedIds.join(',');
                        if (selectedIds != "") {
                            ordersTreeData.forEach(async function (record) {
                                record.items.forEach(function (item) {
                                    checkedIds.forEach(function (selectedId) {
                                        if (item.id == selectedId) {
                                            orderGroup = item.type;
                                        }
                                    })
                                })
                            });
                            switch (orderGroup) {
                                case OrderGroupTypes[OrderGroupTypes.OrderStatus]:
                                    selectedGridData = [];
                                    selectedTreeItem.id = id;
                                    selectedTreeItem.type = orderGroup;
                                    ordersList = await getOrders(orderGroup, selectedIds, null, null);
                                    selectedGridData = ordersList;
                                    rawProduct = Object.assign([], ordersList);
                                    createOrdersGridContainer(ordersList, viewType, orderGroup);
                                    break;
                                case OrderGroupTypes[OrderGroupTypes.OrderPeriod]:
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            ordersList = [];
                            selectedGridData = [];
                            createOrdersGridContainer(ordersList, viewType, orderGroup);
                        }
                        break;
                    case OrderGroupTypes[OrderGroupTypes.OrderPeriod]:
                        //ordersList = [];
                        //selectedGridData = [];
                        //createOrdersGridContainer(ordersList, viewType, orderGroup);
                        break;
                }
            });

            thisComponent.groupTree.events.on("itemClick", async function (id, e) {
                var selectedTreeId = id;
                ordersTreeData.forEach(async function (record) {
                    record.items.forEach(function (item) {
                        if (item.id == id) {
                            orderGroup = item.type;
                        }
                    });
                });

                switch (orderGroup) {
                    case OrderGroupTypes[OrderGroupTypes.OrderStatus]:
                        break;
                    case OrderGroupTypes[OrderGroupTypes.OrderPeriod]:
                        selectedGridData = [];
                        selectedTreeItem.id = selectedTreeId;
                        selectedTreeItem.type = orderGroup;
                        let checkedIds = thisComponent.groupTree.getChecked();
                        if (checkedIds.length > 0) {
                            var treeRootName = $(thisComponent.groupTree.data)[0]._root;
                            var treeChilds = $(thisComponent.groupTree.data._childs)[0];
                            var parentObj = $(treeChilds[treeRootName][0]);
                            parentObj[0].items.forEach(function (item) {
                                item.$mark = 0;
                            });
                            parentObj[0].$mark = 0;
                        }
                        if (id == "3011") {
                            //Create a form to get From and To date 
                            var form = new dhx.Form("form_container", {
                                rows: [
                                    {
                                        id: "fromDate",
                                        type: "datepicker",
                                        label: "From Date",
                                        labelInline: true,
                                        labelWidth: "80px",
                                        placeholder: "Select Date",
                                        dateFormat: "%d/%m/%Y",
                                        enableTime: false,
                                        enableTodayButton: true,
                                        disabledDates: function (date) {
                                            var presentDate = new Date();
                                            var d = date.getTime();
                                            var p = presentDate.getTime();
                                            if (d <= p) {
                                                return false;
                                            }
                                            else {
                                                return true;
                                            }
                                        }
                                    },
                                    {
                                        id: "toDate",
                                        type: "datepicker",
                                        label: "To Date",
                                        labelInline: true,
                                        labelWidth: "80px",
                                        placeholder: "Select Date",
                                        dateFormat: "%d/%m/%Y",
                                        enableTime: false,
                                        enableTodayButton: true,
                                        disabledDates: function (date) {
                                            var presentDate = new Date();
                                            var d = date.getTime();
                                            var p = presentDate.getTime();
                                            if (d > p) {
                                                return false;
                                            }
                                            else {
                                                return true;
                                            }
                                        }
                                    },
                                    {
                                        type: "button",
                                        value: "Ok",
                                        size: "medium",
                                        view: "flat",
                                        color: "primary"
                                    }
                                ]
                            });
                            //Create a window to attach form
                            var dhxWindow = new dhx.Window({
                                header: "DHX Window",
                                modal: true,
                                resizable: true,
                                movable: true,
                                width: 400,
                                height: 400,
                                closable: true,
                                title: "Select Date"
                            });
                            dhxWindow.attach(form);
                            dhxWindow.show();
                            form.events.on("ButtonClick", async function (id, e) {
                                var state = form.getValue();
                                dates = state;
                                orderCustomDates = state;
                                dhxWindow.hide();
                                ordersList = await getOrders(orderGroup, selectedTreeId, dates.fromDate, dates.toDate);
                                rawProduct = Object.assign([], ordersList);
                                selectedGridData = ordersList;
                                createOrdersGridContainer(ordersList, viewType, orderGroup)
                            });
                        }
                        else {
                            ordersList = await getOrders(orderGroup, selectedTreeId, null, null);
                            rawProduct = Object.assign([], ordersList);
                            selectedGridData = ordersList;
                            createOrdersGridContainer(ordersList, viewType, orderGroup)
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        function createOrdersGridContainer(data, viewType, orderGroup) {
            if (data.length > 0) {
                createOrderGridColumns(viewType, orderGroup);
                thisComponent.dataGrid.data.parse(data);
                thisComponent.layoutContainer.cell(dataGridContainerId).attach(thisComponent.dataGrid);
            }
            else {
                thisComponent.dataGrid.data.parse(data);
                thisComponent.dataGrid.paint();
            }
        }

        function createOrderGridColumns(viewType, orderGroup) {
            if (viewType == DataListToolBarEvents[DataListToolBarEvents.LightView] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    { width: 250, id: "id", header: [{ text: "Order Id" }], hidden: true },
                    { width: 200, id: "customNo", header: [{ text: "Custom No" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "billToFirstName", header: [{ text: "Bill To FirstName" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "billToLastName", header: [{ text: "Bill To LastName" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "userEmail", header: [{ text: "User Email" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        width: 150, id: "grandTotal", header: [{ text: "GrandTotal" }], htmlEnable: true, type: "number", footer: [{ content: "sum" }], resizable: true, template: function (text, row, col) {
                            //if (row.grandTotal != null) {
                            //    row.grandTotal = Math.round(row.grandTotal * 100) / 100;
                            //}
                            return row.grandTotal;
                        }
                    },
                    { width: 200, id: "paymentStatus", header: [{ text: "Payment Status", align: "right" }, { content: "selectFilter" }], align: "right", htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "paymentGateway", header: [{ text: "Payment Gateway", align: "right" }, { content: "selectFilter" }], htmlEnable: true, type: "number", resizable: true },
                    { width: 200, id: "statusCode", header: [{ text: "Order Status" }, { content: "selectFilter" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            //var date = new Date(row.created);
                            //var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + row.created + '</span>';
                        }
                    }
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.LargeView] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    { width: 250, id: "id", header: [{ text: "Order Id" }], hidden: true },
                    { width: 200, id: "customNo", header: [{ text: "CustomNo" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 150, id: "billToFirstName", header: [{ text: "BillToFirstName" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 150, id: "billToLastName", header: [{ text: "BillToLastName" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "userEmail", header: [{ text: "UserEmail" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        width: 150, id: "grandTotal", header: [{ text: "GrandTotal" }], htmlEnable: true, type: "number", footer: [{ content: "sum" }], resizable: true, template: function (text, row, col) {
                            if (row.grandTotal != null) {
                                row.grandTotal = Math.round(row.grandTotal * 100) / 100;
                            }
                            return row.grandTotal;
                        }
                    },
                    { width: 200, id: "paymentStatus", header: [{ text: "PaymentStatus" }, { content: "selectFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "statusCode", header: [{ text: "Order Status" }, { content: "selectFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 100, id: "currencyCode", header: [{ text: "CurrencyCode" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        id: "isSeedOrder", htmlEnable: true, header: [{ text: "SeedOrder" }], resizable: true, width: 150, template: function (cellValue, row) {
                            var value = (row.isSeedOrder == true ? 'Yes' : 'No')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    {
                        id: "hasSubscription", htmlEnable: true, header: [{ text: "HasSubscription" }], resizable: true, width: 150, template: function (cellValue, row) {
                            var value = (row.hasSubscription == true ? 'Yes' : 'No')
                            let html = '<span>' + value + '</span>'
                            return html
                        }
                    },
                    {
                        width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            var date = new Date(row.created);
                            var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + formattedDate + '</span>';
                        }
                    },
                    { width: 200, id: "createdBy", header: [{ text: "CreatedBy" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        width: 150, id: "lastUpdated", header: [{ text: "LastUpdated" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            var date = new Date(row.lastUpdated);
                            var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + formattedDate + '</span>';
                        }
                    },
                    { width: 200, id: "lastUpdatedBy", header: [{ text: "LastUpdatedBy" }], htmlEnable: true, type: "string", resizable: true },
                ]);
            }

            if (filter == DataListToolBarEvents[DataListToolBarEvents.FilterHideAll]) {
                thisComponent.dataGrid.setColumns([
                    { width: 250, id: "id", header: [{ text: "Order Id" }], hidden: true },
                    { width: 200, id: "customNo", header: [{ text: "Custom No" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "orderNo", header: [{ text: "Order No" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "userEmail", header: [{ text: "UserEmail" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "paymentStatus", header: [{ text: "PaymentStatus" }, { content: "selectFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 200, id: "statusCode", header: [{ text: "Order Status" }, { content: "selectFilter" }], htmlEnable: true, type: "string", resizable: true },
                    {
                        width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            var date = new Date(row.created);
                            var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + formattedDate + '</span>';
                        }
                    },
                    { width: 200, id: "createdBy", header: [{ text: "CreatedBy" }], htmlEnable: true, type: "string", resizable: true }
                ]);
            }

            if (viewType == DataListToolBarEvents[DataListToolBarEvents.Delivery] && filter == DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]) {
                thisComponent.dataGrid.setColumns([
                    { width: 250, id: "id", header: [{ text: "Order Id" }], hidden: true },
                    { width: 200, id: "customNo", header: [{ text: "CustomNo" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true },
                    { width: 250, id: "billToFirstName", header: [{ text: "Billing FirstName" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "billToLastName", header: [{ text: "Billing LastName" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "userEmail", header: [{ text: "Email" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "carrier", header: [{ text: "Carrier" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "shippingMethodId", header: [{ text: "Shipping Method Id" }], htmlEnable: true, hidden: true, resizable: true },
                    { width: 150, id: "shippingMethodType", header: [{ text: "Shipping Method" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "shipToFirstName", header: [{ text: "Shipping FirstName" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 250, id: "shipToLastName", header: [{ text: "Shipping LastName" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 350, id: "shipToAddress", header: [{ text: "Shipping Address" }], htmlEnable: true, resizable: true },
                    { width: 350, id: "shipToAddress2", header: [{ text: "Shipping Address Line2" }], htmlEnable: true, resizable: true },
                    { width: 350, id: "shipToAddress3", header: [{ text: "Shipping Address Line3" }], htmlEnable: true, resizable: true },
                    { width: 200, id: "shipToCity", header: [{ text: "Shipping City" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 200, id: "shipToState", header: [{ text: "Shipping State" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 150, id: "shipToZip", header: [{ text: "Shipping Zip" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 220, id: "shipToCountryCode", header: [{ text: "Shipping Country" }, { content: "selectFilter" }], htmlEnable: true, resizable: true },
                    { width: 200, id: "shipToPhoneNo", header: [{ text: "Shipping PhoneNo" }], htmlEnable: true, resizable: true },
                    {
                        width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            var date = new Date(row.created);
                            var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + formattedDate + '</span>';
                        }
                    }
                ]);
            }
        }

        async function createOrdersToolbarEvents() {
            thisComponent.toolBarTree.events.on("Click", async function (id, e) {
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeRefresh]) {
                    await createOrdersTreeContainer()
                }
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeExpandAll]) {
                    thisComponent.groupTree.openAll();
                }
                if (id == TreeToolBarEvents[TreeToolBarEvents.TreeCollapseAll]) {
                    thisComponent.groupTree.closeAll();
                }
            });

            //ToolBar Data Grid
            thisComponent.toolBarDataGrid.events.on("Click", async function (id, e) {
                switch (id) {
                    case DataListToolBarEvents[DataListToolBarEvents.LightView]:
                        thisComponent.toolBarDataGrid.setState({ "LightView": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.LightView];
                            createOrdersGridContainer(ordersList, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.LargeView]:
                        thisComponent.toolBarDataGrid.setState({ "LargeView": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.LargeView];
                            createOrdersGridContainer(ordersList, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.Delivery]:
                        thisComponent.toolBarDataGrid.setState({ "Delivery": true });
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            viewType = DataListToolBarEvents[DataListToolBarEvents.Delivery];
                            createOrdersGridContainer(ordersList, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterReset]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterShowAll];
                            createOrdersGridContainer(ordersList, viewType, filter);
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterShowAll]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterShowAll];
                            createOrdersGridContainer(ordersList, viewType, filter)
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.FilterHideAll]:
                        if (selectedTreeItem.type != "" && selectedTreeItem.id != null) {
                            filter = DataListToolBarEvents[DataListToolBarEvents.FilterHideAll];
                            createOrdersGridContainer(ordersList, viewType, filter)
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.ListRefresh]:
                        await refreshOrderDataGrid(true);
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.SelectAll]:
                        var selectAllState = thisComponent.toolBarDataGrid.getState();
                        selectAllGridRecords();
                        await refreshOrderDetailGrid();
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.GridExport]:
                        if (ordersList.length > 0) {
                            var serializesData = thisComponent.dataGrid.data.serialize();
                            var treeId = selectedTreeItem.id;
                            var orderType = selectedTreeItem.type;
                            var fromDate = orderCustomDates.fromDate;
                            var toDate = orderCustomDates.toDate;
                            var ids = serializesData.map((obj) => obj.id).join(',');
                            if (treeId != null && orderType != "" && ids != "") {
                                exportOrdersGridToExcel(viewType, orderType, treeId, ids, fromDate, toDate);
                            }
                        }
                        break;
                    case DataListToolBarEvents[DataListToolBarEvents.PrintGrid]:
                        if (ordersList.length > 0) {
                            var html = $(".dhx_grid-content").clone();
                            $(html[0]).find(".dhx_header-rows .dhx_header-row:eq(1)").remove();
                            $(html[0]).find(".dhx_grid-body .dhx_header-wrapper").removeAttr("style");
                            $(html[0]).find(".dhx_grid-header").css("height", "41px");
                            $(html[0]).find(".dhx_grid-header-cell--align_right").css("padding-left", "8px");
                            var win = window.open('', 'printwindow');
                            win.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="../assets/libs/dhx/suite.css"></head><body>' +
                                $(html[0]).find('.dhx_grid-body').html() +
                                '</body></html>');
                        }
                        break;
                    default:
                        break;
                }
                thisComponent.dataGrid.content.inputFilter.value = {};
                thisComponent.dataGrid.content.selectFilter.value = {};
                thisComponent.dataGrid.data.parse(rawProduct);
                thisComponent.dataGrid.paint();
            });

            //ToolBar Detail Grid
            thisComponent.toolBarDetailGrid.events.on("Click", async function (id, e) {
                switch (id) {
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.BasicInfo]:
                        thisComponent.toolBarDetailGrid.setState({ "BasicInfo": true });
                        thisComponent.toolBarDetailGrid.enable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]]);
                        toolBarOrderTabField = OrderFieldGroup.BasicInfo;
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Products]:
                        thisComponent.toolBarDetailGrid.enable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel]]);
                        thisComponent.toolBarDetailGrid.disable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]]);
                        thisComponent.toolBarDetailGrid.setState({ "Products": true });
                        toolBarOrderTabField = OrderFieldGroup.Products;
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.History]:
                        thisComponent.toolBarDetailGrid.disable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]]);
                        thisComponent.toolBarDetailGrid.setState({ "History": true });
                        toolBarOrderTabField = OrderFieldGroup.History;
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Messages]:
                        thisComponent.toolBarDetailGrid.disable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]]);
                        thisComponent.toolBarDetailGrid.setState({ "Messages": true });
                        toolBarOrderTabField = OrderFieldGroup.Messages;
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.OrderProducts]:
                        thisComponent.toolBarDetailGrid.enable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel]]);
                        thisComponent.toolBarDetailGrid.disable([DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save], DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]]);
                        thisComponent.toolBarDetailGrid.setState({ "OrderProducts": true });
                        toolBarOrderTabField = OrderFieldGroup.OrderProducts;
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Refresh]:
                        //From API
                        await refreshOrderDetailGrid();
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel]:
                        if (selectedDetailGridData.length > 0) {
                            //Removing any css applied on grid cells
                            var ids = checkedData.map(function (record) { return record.id }).join(",");
                            var fieldGroup = toolBarOrderTabField;
                            if (fieldGroup != null && ids != "") {
                                exportOrderDetailsToExcel(fieldGroup, ids);
                            }
                        }
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderPayment]:
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.UpdateOrderStatus]:
                        //From API
                        if (selectedDetailGridData.length > 0) {
                            var html = '';
                            var rowHtml = '';
                            html = '<table style="width:100%;border:solid black 1px">' +
                                '<tr>' +
                                '<th>Order No</th>' +
                                '<th>Status</th>' +
                                '<th>Comment</th>' +
                                '<th></th>' +
                                '</tr>';
                            var dhxWindowOS = new dhx.Window({
                                header: true,
                                footer: true,
                                modal: true,
                                resizable: true,
                                movable: true,
                                width: 1100,
                                height: 700,
                                closable: true,
                                title: "Order Details"
                            });
                            dhxWindowOS.footer.data.add({ type: "spacer" });
                            dhxWindowOS.footer.data.add({ value: "Cancel", id: "cancel" });
                            dhxWindowOS.footer.data.add({ value: "Save", id: "save" });

                            for (var i = 0; i < selectedDetailGridData.length; i++) {
                                var obj = selectedDetailGridData[i];
                                rowHtml += await getOrderStatusRows(obj);
                            }
                            html += rowHtml + '</table>';
                            dhxWindowOS.attachHTML(html);
                            dhxWindowOS.footer.events.on("click", async function (id) {
                                if (id === "cancel") {
                                    dhxWindowOS.hide();
                                }
                                if (id === "save") {
                                    var resp = await updateOrderStatus(selectedDetailGridData);
                                    if (resp.length > 0) {
                                        selectedSave = resp;
                                        saveOrderProperties(selectedSave, toolBarOrderTabField);
                                        dhxWindowOS.hide();
                                    }
                                    dhxWindowOS.footer.data.update(id, { count: dhxWindowOS.footer.data.getItem(id).count + 1 });
                                }
                            });
                            dhxWindowOS.show();
                        }
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Save]:
                        let selectedItemType = [];
                        var selectedSave = [];
                        switch (toolBarOrderTabField) {
                            case OrderFieldGroup.BasicInfo:
                                break;
                        }
                        await refreshOrderDetailGrid();
                        break;
                    default:
                        break;
                }
            });
        }

        //Order Status Html
        async function getOrderStatusRows(obj) {
            var orderStatus = '';
            switch (obj.statusCode) {
                case OrderStatus[OrderStatus.CancelledByStore]:
                    orderStatus = await getOrderStatusHtml(obj);
                    break;
                case OrderStatus[OrderStatus.Pending]:
                    orderStatus = await getOrderStatusHtml(obj);
                    break;
                case OrderStatus[OrderStatus.Approved]:
                    orderStatus = await getOrderStatusHtml(obj);
                    break;
                case OrderStatus[OrderStatus.Incomplete]:
                    orderStatus = await getOrderStatusHtml(obj);
                    break;
                case OrderStatus[OrderStatus.Dispatch]:
                    orderStatus = obj.statusCode;
                    break;
                case OrderStatus[OrderStatus.CancelledByCustomer]:
                    orderStatus = await getOrderStatusHtml(obj);
                    break;
            }
            if (obj.statusCode != OrderStatus[OrderStatus.Dispatch] && obj.statusCode != OrderStatus[OrderStatus.Incomplete] && obj.statusCode != OrderStatus[OrderStatus.Approved]
                && obj.statusCode != OrderStatus[OrderStatus.Pending] && obj.statusCode != OrderStatus[OrderStatus.CancelledByStore] && obj.statusCode != OrderStatus[OrderStatus.CancelledByCustomer]) {
                orderStatus = await getOrderStatusHtml(obj);
            }

            var html = '<tr>' +
                '<td>' + obj.customNo + '</td>' +
                '<td>' + orderStatus + '</td>' +
                '<td>' +
                '<div class="form-group row">' +
                '<textarea class="form-control" cols="20" style="width:350px; margin-left:11px;" id="orderUpdateComment' + obj.id + '-' + obj.customNo + '" name = "orderUpdateComment' + obj.id + '-' + obj.customNo + '" rows = "2"></textarea>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="form-group row">' +
                '<span id="errorMessage' + obj.id + '-' + obj.customNo + '"></span>' +
                '</div>' +
                '</td>' +
                '</tr>';
            return html;
        }

        async function getOrderStatusHtml(row) {
            var statusList = await getOrgDocStatusConfig(row.statusId);
            var html = '<div class="form-group" style="padding-top:19px;"><select class="form-control" id="orderStatus' + row.id + '-' + row.customNo + '" style="width:300px">';
            for (var i = 0; i < statusList.length; i++) {
                var obj = statusList[i];
                html = html + ' <option value="' + obj.customText + '" ' + '">' + obj.statusLabel + '</option>'
            }
            html = html + "</div>";
            return html;
        }

        function updateOrderStatus(detailGridData) {
            var finalOrderStatusList = [];
            for (var i = 0; i < detailGridData.length; i++) {
                var flag = true;
                var orderstatus = { orderStatusText: '', orderType: '', paymentStatus: '', comment: '', id:''};
                var obj = detailGridData[i];
                orderstatus.id = obj.id;
                var stat = "#orderStatus" + obj.id + '-' + obj.customNo;
                var comm = "#orderUpdateComment" + obj.id + '-' + obj.customNo;
                var er = "#errorMessage" + obj.id + '-' + obj.customNo;
                $(er).html('').append("");
                if ($(stat)[0] != undefined) {
                    orderstatus.orderStatusText = $(stat)[0].value;
                }
                if ($(comm)[0] != undefined) {
                    orderstatus.comment = $(comm)[0].value;
                }
                var balanceAmount = obj.grandTotal;
                var orderType = obj.orderType;
                orderstatus.paymentStatus = obj.paymentStatus;
                var statusId = '0';
                if (orderstatus.orderStatusText) {
                    statusId = orderstatus.orderStatusText.split(',')[0];
                }
                orderstatus.orderType = orderType;
                //status=> 2: Pending 3:Aproved,107:IdRequired
                //check payment status in case of Pending,Aproved,IdRequired,21:Accepted
                if ((statusId === OrderStatus.Approved.toString() || statusId === OrderStatus.Pending.toString() || statusId === OrderStatus.Accepted.toString() || statusId === OrderStatus.IDREQUIRED.toString()) && (orderstatus.paymentStatus === PaymentStatus[PaymentStatus.Pending] || orderstatus.paymentStatus === PaymentStatus[PaymentStatus.Declined]) && orderType != OrderType.ForwardSalesOrder.toString()) //Payment status pending or declined
                {
                    $(er).html('').append("Payment status should<br>be authorized.");
                    flag = false;
                }
                if ((statusId === OrderStatus.Approved.toString() || statusId === OrderStatus.Pending.toString() || statusId === OrderStatus.Accepted.toString() || statusId === OrderStatus.IDREQUIRED.toString()) && (orderType != OrderType.SubscriptionSeedOrder.toString() && balanceAmount != 0) && orderType != OrderType.ForwardSalesOrder.toString()) {//Payment status pending or declined and ordeType=1 is SubscriptionSeedOrder
                    //return alerts.error(ORDER_CONSTANTS.PARTIAL_PAYMENT_STATUS);
                    $(er).html('').append("Paid amount is not<br>equal to order amount.");
                    flag = false;
                }
                if (orderstatus.orderStatusText != null && orderstatus.orderStatusText != undefined && orderstatus.orderStatusText != '') {
                    if (!orderstatus.comment)
                        orderstatus.comment = '';
                    if (flag) {
                        finalOrderStatusList.push(orderstatus);
                    }
                }
                else {
                    $(er).html('').append("Order status required.");
                    flag = false;
                }
            }
            return finalOrderStatusList;
        }

        async function createOrderGridEvents() {
            //Grid Events
            thisComponent.dataGrid.events.on("cellClick", async function (row, column, e) {
                let orderIds = '';
                var selection = thisComponent.dataGrid.selection.getCells();
                var selectedRecords = selection.map(function (item) {
                    return item.row;
                })
                var isSelectedRecord = selectedRecords.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
                if (isSelectedRecord.length > 0) {
                    //Remove old css
                    if (checkedData.length > 0) {
                        checkedData.forEach(function (record) {
                            record.isSelected = false;
                            thisComponent.dataGrid.removeRowCss(record.id, "myCustomSelectionClass");
                        })
                    }
                    checkedData = [];
                    selectedGridData = [];
                    //Add Selected Row Css
                    isSelectedRecord.forEach(function (row) {
                        thisComponent.dataGrid.addRowCss(row.id, "myCustomSelectionClass");
                        row.isSelected = true;
                        if (checkedData.length == 0) {
                            checkedData.unshift(row);
                            selectedGridData.unshift(row);
                        }
                        else {
                            let count = 0
                            checkedData.forEach(function (record) {
                                if (record.id == row.id) {
                                    count++;
                                }
                            });
                            if (count == 0) {
                                checkedData.push(row);
                                selectedGridData = Object.assign([], checkedData);
                            }
                        }
                    });
                }
                toolBarOrderTabField = getGridStateForOrder();
                let result = [];
                orderIds = checkedData.map(function (record) { return record.id }).join(",");
                if (orderIds != "") {
                    result = await getOrderFieldData(toolBarOrderTabField, orderIds);
                }
                selectedDetailGridData = result;
                createOrderDetailGridContainer(result)
            });
        }

        function createOrderDetailGridContainer(data) {
            if (data == null) {
                data = [];
            }
            selectedProductGridData = data.splice();
            if (toolBarOrderTabField == OrderFieldGroup.OrderProducts) {
                var parent = thisComponent.layoutContainer.cell(detailContainerId).getParent();
                thisComponent.layoutContainer.removeCell(detailContainerId);
                thisComponent.layoutContainer.removeCell(videoContainerId);
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: videoContainerId, header: "Products Section", height: 400, autoWidth: true, rows: [] }, videoContainerId);
                thisComponent.layoutContainer.cell(parent.id).addCell({ id: detailContainerId, header: "Orders Section", height: 400, autoWidth: true, mark: "", rows: [] }, detailContainerId);
                thisComponent.layoutContainer.cell(videoContainerId).addCell({ id: childDetail, header: "", height: 400, autoWidth: false }, childDetail);
                thisComponent.layoutContainer.cell(videoContainerId).addCell({ id: childHeader, header: "", height: 60, autoWidth: false }, childHeader);
                createOrderDetailGridColumns(selectedProductGridData);
                createOrderDetailGridEvents();
            }
            else {
                detachLayoutContainerObject(detailContainerId, thisComponent.detailGrid, []);
                detachLayoutContainerObject(videoContainerId, thisComponent.detailGrid, []);
                thisComponent.detailGrid = new dhx.Grid(detailContainerId, { selection: true, adjust: false, height: 800, autoWidth: false, htmlEnable: true /*, autoEmptyRow: true*/ });
                if (data.length > 0) {
                    createOrderDetailGridColumns(data);
                    thisComponent.detailGrid.data.parse(data);
                    thisComponent.layoutContainer.cell(detailContainerId).attach(thisComponent.detailGrid);
                    createOrderDetailGridEvents();
                }
            }
        }

        async function createOrderDetailGridColumns(data) {
            switch (toolBarOrderTabField) {
                case OrderFieldGroup.BasicInfo:
                    thisComponent.detailGrid.setColumns([
                        { width: 300, id: "id", header: [{ text: "Id" }], hidden: true },
                        { width: 200, id: "customNo", header: [{ text: "CustomNo" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 200, id: "userEmail", header: [{ text: "UserEmail" }, { content: "inputFilter" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        {
                            width: 150, id: "grandTotal", header: [{ text: "GrandTotal" }], htmlEnable: true, type: "number", editable: false, template: function (text, row, col) {
                                if (row.grandTotal != null) {
                                    row.grandTotal = Math.round(row.grandTotal * 100) / 100;
                                }
                                return row.grandTotal;
                            }
                        },
                        {
                            width: 200, id: "paymentStatus", header: [{ text: "Payment Status" }, { content: "selectFilter" }], htmlEnable: true
                        },
                        {
                            width: 200, id: "statusCode", header: [{ text: "Order Status" }, { content: "selectFilter" }], htmlEnable: true
                        },
                        { width: 100, id: "currencyCode", header: [{ text: "CurrencyCode" }], htmlEnable: true, resizable: true, type: "string", editable: false },
                        {
                            width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", editable: false, template: function (text, row, col) {
                                var date = new Date(row.created);
                                var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                return '<span>' + formattedDate + '</span>';
                            }
                        },
                        { width: 200, id: "createdBy", header: [{ text: "Created By" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        {
                            width: 150, id: "lastUpdated", header: [{ text: "LastUpdated" }], htmlEnable: true, type: "string", editable: false, template: function (text, row, col) {
                                var date = new Date(row.created);
                                var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                return '<span>' + formattedDate + '</span>';
                            }
                        },
                        { width: 200, id: "lastUpdatedBy", header: [{ text: "LastUpdated By" }], htmlEnable: true, editable: false, resizable: true, type: "string" },
                    ]);
                    break;
                case OrderFieldGroup.Products:
                    thisComponent.detailGrid.setColumns([
                        { width: 300, id: "id", header: [{ text: "Id" }], hidden: true },
                        { width: 300, id: "productName", header: [{ text: "Product Name" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 250, id: "orderNo", header: [{ text: "Order No" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 250, id: "productStockCode", header: [{ text: "Stock Code" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 100, id: "qty", header: [{ text: "Quantity" }], htmlEnable: true, type: "number", resizable: true, editable: false },
                        { width: 120, id: "returnQty", header: [{ text: "Qty Returned" }], htmlEnable: true, type: "number", resizable: true, css: "inStockCss" },
                        { width: 120, id: "onHandQty", header: [{ text: "Current Stock" }], htmlEnable: true, type: "number", resizable: true, editable: false },
                        { width: 150, id: "priceWithoutTax", header: [{ text: "Price Without Tax" }], htmlEnable: true, resizable: true, type: "number" },
                        { width: 100, id: "lineTotal", header: [{ text: "Line Total" }], htmlEnable: true, type: "number", resizable: true, editable: false },
                        {
                            width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                                var date = new Date(row.created);
                                var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                return '<span>' + formattedDate + '</span>';
                            }
                        },
                        { width: 200, id: "createdBy", header: [{ text: "Created By" }], htmlEnable: true, type: "string", editable: false },
                        {
                            width: 150, id: "lastUpdated", header: [{ text: "LastUpdated" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                                var date = new Date(row.created);
                                var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                return '<span>' + formattedDate + '</span>';
                            }
                        },
                        { width: 200, id: "lastUpdatedBy", header: [{ text: "LastUpdated By" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                    ]);
                    break;
                case OrderFieldGroup.History:
                    thisComponent.detailGrid.setColumns([
                        { width: 300, id: "id", header: [{ text: "Id" }], type: "string", hidden: true },
                        { width: 100, id: "orderLogId", header: [{ text: "Id" }], type: "number", resizable: true, hidden: true },
                        { width: 200, id: "customNo", header: [{ text: "Custom No" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 300, id: "comment", header: [{ text: "Comment" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 200, id: "createdBy", header: [{ text: "Created By" }], htmlEnable: true, type: "string", resizable: true, editable: false },
                        { width: 100, id: "updateType", header: [{ text: "Update Type" }], type: "number", htmlEnable: true, resizable: true, },
                        { width: 100, id: "updateValue", header: [{ text: "Update Value" }], htmlEnable: true, type: "string", editable: false, resizable: true, },
                        {
                            width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                                //var date = new Date(row.created);
                                //var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                //return '<span>' + formattedDate + '</span>';
                            }
                        },
                    ])
                    break;
                case OrderFieldGroup.Messages:
                    thisComponent.detailGrid.setColumns([
                        { width: 300, id: "id", header: [{ text: "Id" }], type: "string", hidden: true },
                        { width: 100, id: "orderNo", header: [{ text: "Order No" }], htmlEnable: true, type: "string", editable: false, resizable: true, },
                        { width: 300, id: "note", header: [{ text: "Note" }], htmlEnable: true, resizable: true, },
                        { width: 200, id: "paymentId", header: [{ text: "Payment Id" }], resizable: true, },
                        {
                            width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                                var date = new Date(row.created);
                                var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                                return '<span>' + formattedDate + '</span>';
                            }
                        }
                    ])
                    break;
                case OrderFieldGroup.OrderProducts:
                    createOrdersSectionGrid(selectedDetailGridData);
                    break;
                default:
                    break;
            }
        }

        function createOrdersSectionGrid(dataSet) {
            thisComponent.detailGrid = new dhx.Grid(detailContainerId, {
                columns: [
                    { width: 300, id: "userId", header: [{ text: "User Id" }], type: "string", htmlEnable: true, hidden: true },
                    { width: 100, id: "customNo", header: [{ text: "Order No" }], htmlEnable: true, type: "string", editable: false, resizable: true, },
                    { width: 150, id: "billToFirstName", header: [{ text: "BillToFirstName" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    { width: 150, id: "billToLastName", header: [{ text: "BillToLastName" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    { width: 200, id: "userEmail", header: [{ text: "User Email" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    { width: 200, id: "paidAmount", header: [{ text: "Total Paid" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    { width: 200, id: "paymentGateway", header: [{ text: "Payment" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    { width: 200, id: "statusCode", header: [{ text: "Order Status" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    //{ width: 200, id: "created", header: [{ text: "Created" }, { content: "selectFilter" }], htmlEnable: true, type: "string" },
                    {
                        width: 150, id: "created", header: [{ text: "Created" }], htmlEnable: true, type: "string", template: function (text, row, col) {
                            var date = new Date(row.created);
                            var formattedDate = new Intl.DateTimeFormat('en-GB').format(date).toString();
                            return '<span>' + formattedDate + '</span>';
                        }
                    }
                ],
                data: dataSet,
                height: 350, htmlEnable: true,
                selection: "row", multiselection: true, multiselectionmode: "click", adjust: false, autoWidth: false, autoEmptyRow: false,
            });
            thisComponent.layoutContainer.cell(detailContainerId).attach(thisComponent.detailGrid);

            let toolBarTreeFilters = [
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Refresh],
                    type: "navItem",
                    icon: "fa fa-refresh",
                    tooltip: "Refresh Grid"
                },
                {
                    id: DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel],
                    type: "navItem",
                    icon: "fa fa-file-excel-o",
                    tooltip: "Export Excel"
                }
            ];
            thisComponent.toolBarOrderDetailGrid = new dhx.Toolbar(toolbarContainerDetail, { css: "toolBarDetailCss" });
            thisComponent.toolBarOrderDetailGrid.data.parse(toolBarTreeFilters);

            thisComponent.layoutContainer.cell(childHeader).attach(thisComponent.toolBarOrderDetailGrid);
            thisComponent.childGrid = new dhx.Grid(childDetail, { selection: true, adjust: false, height: 350, autoWidth: false, rows: [], htmlEnable: true });
            thisComponent.layoutContainer.cell(childDetail).attach(thisComponent.childGrid);
        }

        function createOrderDetailGridEvents() {
            let orderProductIds = '';
            selectedOrdersProductsList = [];

            thisComponent.detailGrid.events.on("cellClick", async function (row, column, e) {
                toolBarOrderTabField = getGridStateForOrder();
                if (toolBarOrderTabField == OrderFieldGroup.OrderProducts) {
                    var selection = thisComponent.detailGrid.selection.getCells();
                    var selectedRecords = selection.map(function (item) {
                        return item.row;
                    })
                    var isSelectedRecord = selectedRecords.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
                    if (isSelectedRecord.length > 0) {
                        //Remove old css
                        checkedOrdersData = [];
                        //Add Selected Row Css
                        isSelectedRecord.forEach(function (row) {
                            thisComponent.detailGrid.addRowCss(row.id, "myCustomSelectionClass");
                            row.isSelected = true;
                            if (checkedOrdersData.length == 0) {
                                checkedOrdersData.unshift(row);
                            }
                            else {
                                let count = 0
                                checkedOrdersData.forEach(function (record) {
                                    if (record.id == row.id) {
                                        count++;
                                    }
                                });
                                if (count == 0) {
                                    checkedOrdersData.push(row);
                                }
                            }
                        });

                    }
                    let result = [];
                    orderProductIds = checkedOrdersData.map(function (record) { return record.id }).join(",");
                    if (orderProductIds != "") {
                        result = await getOrderFieldData(OrderFieldGroup.Products, orderProductIds);
                        selectedOrdersProductsList = result;
                    }
                    createProductsSectionGrid(selectedOrdersProductsList);
                }
            });
        }

        async function saveOrderProperties(selectedSave, toolBarOrderTabField) {
            if (selectedSave != null) {
                var result = await saveOrderFieldData(toolBarOrderTabField, selectedSave);
                var text = "Order Details updated !!!";
                if (result.isValid) {
                    dhx.message({
                        text: text,
                        expire: 3000,
                        type: "customCss"
                    });
                }
                if (result.isValid == false) {
                    dhx.message({
                        text: "Please validate all the changes !!",
                        expire: 3000,
                        type: "customCss"
                    });
                }
                selectedSave = selectedDetailGridData;
                await refreshOrderDetailGrid();
            }
        }

        function createOrderProductToolbarEvents() {
            thisComponent.toolBarOrderDetailGrid.events.on("Click", async function (id, e) {
                switch (id) {
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Refresh]:
                        if (checkedOrdersData.length > 0) {
                            let orderProductIds = checkedOrdersData.map(function (record) { return record.id }).join(",");
                            if (orderProductIds != "") {
                                let result = await getOrderFieldData(OrderFieldGroup.Products, orderProductIds);
                                selectedOrdersProductsList = result;
                            }
                            createProductsSectionGrid(selectedOrdersProductsList);
                        }
                        break;
                    case DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Excel]:
                        if (selectedOrdersProductsList.length > 0) {
                            var idList = selectedOrdersProductsList.map(function (record) { return record.orderId });
                            idList = idList.filter(function (item, index, inputArray) {
                                return inputArray.indexOf(item) == index;
                            });
                            var ids = idList.join(',');
                            var fieldGroup = DetailGridOrderToolbarEvents[DetailGridOrderToolbarEvents.Products];
                            if (fieldGroup != null && ids != "") {
                                exportOrderDetailsToExcel(fieldGroup, ids);
                            }
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        function selectAllGridRecords() {
            checkedData = [];
            var selectAllState = thisComponent.toolBarDataGrid.getState();
            selectedGridData.forEach(function (record) {
                if (selectAllState.SelectAll) {
                    record.isSelected = true;
                    //Add Selected Row Css
                    thisComponent.dataGrid.addRowCss(record.id, "myCustomSelectionClass");
                    checkedData.push(record);
                }
                else {
                    record.isSelected = false;
                    //Add Selected Row Css
                    thisComponent.dataGrid.removeRowCss(record.id, "myCustomSelectionClass");
                    checkedData.splice(0, 1);
                }
            });

        }

        async function refreshOrderDataGrid(value) {
            let ordersList = [];
            if (value) {
                switch (selectedTreeItem.type) {
                    case OrderGroupTypes[OrderGroupTypes.OrderStatus]:
                        ordersList = await getOrders(selectedTreeItem.type, selectedTreeItem.id, null, null);
                        rawProduct = Object.assign([], ordersList);
                        break;
                    case OrderGroupTypes[OrderGroupTypes.OrderPeriod]:
                        ordersList = await getOrders(selectedTreeItem.type, selectedTreeItem.id, orderCustomDates.fromDate, orderCustomDates.toDate);
                        rawProduct = Object.assign([], ordersList);
                        break;
                }
            }
            selectedGridData = ordersList;
            createOrdersGridContainer(ordersList, viewType, selectedTreeItem.type)

        }

        async function refreshOrderDetailGrid() {
            if (checkedData.length > 0) {
                let orderIds = checkedData.map(function (record) { return record.id }).join(",");
                toolBarOrderTabField = getGridStateForOrder();
                let result = await getOrderFieldData(toolBarOrderTabField, orderIds);
                //setCheckBox(result);
                selectedDetailGridData = result;
                createOrderDetailGridContainer(selectedDetailGridData);
            }
            else {
                selectedDetailGridData = [];
                createOrderDetailGridContainer([]);
            }
        }

        //Detach Main Containers
        function clearReusedVariables() {
            selectedGridData = [];
            selectedDetailGridData = [];
            checkedData = [];
        }

        function getGridStateForOrder() {
            let gridState = thisComponent.toolBarDetailGrid.getState();

            switch (gridState.select) {
                case OrderFieldGroup[OrderFieldGroup.BasicInfo]:
                    toolBarOrderTabField = OrderFieldGroup.BasicInfo
                    break;
                case OrderFieldGroup[OrderFieldGroup.Products]:
                    toolBarOrderTabField = OrderFieldGroup.Products
                    break;
                case OrderFieldGroup[OrderFieldGroup.History]:
                    toolBarOrderTabField = OrderFieldGroup.History
                    break;
                case OrderFieldGroup[OrderFieldGroup.Messages]:
                    toolBarOrderTabField = OrderFieldGroup.Messages
                    break;
                case OrderFieldGroup[OrderFieldGroup.OrderProducts]:
                    toolBarOrderTabField = OrderFieldGroup.OrderProducts
                    break;
                default:
                    break;
            }
            return toolBarOrderTabField;
        }

        function detachMainContainers(data, container) {

            //Detail Header and Container
            var detailHeader = thisComponent.layoutContainer.cell(detailHeaderId).getParent();
            thisComponent.layoutContainer.removeCell(detailHeaderId);
            thisComponent.layoutContainer.cell(detailHeader.id).addCell({ id: detailHeaderId, header: container.detailHeader, collapsable: false, resizable: true, gravity: false, width: "650px", rows: [] }, detailHeaderId);

            var parentDetailToolbar = thisComponent.layoutContainer.cell(toolbarContainerDetail).getParent();
            thisComponent.layoutContainer.removeCell(detailContainerHeaderId);
            thisComponent.layoutContainer.removeCell(toolbarContainerDetail);
            thisComponent.layoutContainer.cell(parentDetailToolbar.id).addCell({ id: detailContainerHeaderId, header: "", autoWidth: false, rows: [], css: "detailLayoutCss" }, detailContainerHeaderId);
            thisComponent.layoutContainer.cell(parentDetailToolbar.id).addCell({ id: toolbarContainerDetail, height: 60, header: "", autoWidth: false }, toolbarContainerDetail);
            thisComponent.layoutContainer.cell(detailContainerHeaderId).addCell({ id: detailContainerId, header: "", autoWidth: false }, detailContainerId);
            thisComponent.layoutContainer.cell(detailContainerHeaderId).addCell({ id: videoContainerId, header: "", autoWidth: false }, videoContainerId);

            //Data Grid Header and Container
            var gridHeader = thisComponent.layoutContainer.cell(gridHeaderId).getParent();
            thisComponent.layoutContainer.removeCell(gridHeaderId);
            thisComponent.layoutContainer.cell(gridHeader.id).addCell({ id: gridHeaderId, header: container.gridHeader, collapsable: false, resizable: true, gravity: false, width: "1200px", rows: [] }, gridHeaderId);

            var parentGrid = thisComponent.layoutContainer.cell(dataGridContainerId).getParent();
            thisComponent.layoutContainer.removeCell(dataGridContainerId);
            thisComponent.layoutContainer.removeCell(toolbarContainerList);
            thisComponent.layoutContainer.cell(parentGrid.id).addCell({ id: dataGridContainerId, header: "", height: 800, autoWidth: false, css: "layoutCss" }, dataGridContainerId);
            thisComponent.layoutContainer.cell(parentGrid.id).addCell({ id: toolbarContainerList, header: "", height: 60, autoWidth: false }, toolbarContainerList);

            //Tree Header and Container
            var headerTree = thisComponent.layoutContainer.cell(groupTreeHeaderId).getParent();
            thisComponent.layoutContainer.removeCell(groupTreeHeaderId);
            thisComponent.layoutContainer.cell(headerTree.id).addCell({ id: groupTreeHeaderId, header: container.treeHeader, collapsable: true, resizable: true, gravity: false, width: "400px", rows: [] }, groupTreeHeaderId);

            var parentTree = thisComponent.layoutContainer.cell(treeContainerId).getParent();
            thisComponent.layoutContainer.removeCell(treeContainerId);
            thisComponent.layoutContainer.removeCell(toolbarContainerTree);
            thisComponent.layoutContainer.cell(parentTree.id).addCell({ id: treeContainerId, header: "", height: 800, autoWidth: false, css: "treeCss" }, treeContainerId);
            thisComponent.layoutContainer.cell(parentTree.id).addCell({ id: toolbarContainerTree, header: "", height: 60, autoWidth: false }, toolbarContainerTree);

        }




        /******************************************************* REST Section  ***************************************/

        //Get Tree Info
        async function getProductGroupTree() {
            let result; 
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.GetData(url + 'GetProductFormMasterData', {}, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result
        }

        //Get Grid Info
        async function getProducts(productType, groupId) {
            let result;
            let params = { productType, groupId };
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.GetData(url + 'GetProductsData', params, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        //Get Product Details Info
        async function getProductFieldInfo(fieldGroup, productIds) {
            let result;
            let params = { fieldGroup, productIds };
            let productFieldUrl = url + 'GetProductFieldData'
            await dhx.ajax.post(productFieldUrl, { fieldGroup: fieldGroup, productIds: productIds }).then(function (data) {
                result = data;
            }).catch(function (err) {
                console.log(err);
            });
            return result;
        }

        //Save Product Info
        async function saveProductFieldData(fieldGroup, saveModels) {
            let result;
            let params = { fieldGroup };
            let saveProductModels = {
                productFieldModels: [], dimensions: [], identifiers: [], seoInfo: [], pricing: [], mediaModel: [],
                description: [], shipping: [], collections: [], categories: [], giftWraps: [], brands: [], purchasability: [], domains: []
            };

            switch (fieldGroup) {
                case FieldGroupType.Dimensions:
                    saveProductModels = {
                        productFieldModels: null, dimensions: saveModels, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Identifiers:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: saveModels, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.SeoInfo:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: saveModels, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Pricing:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: saveModels, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Media:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: saveModels,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Description:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: saveModels, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Shipping:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: saveModels, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Collections:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: saveModels, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Category:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: saveModels, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.GiftWrap:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: saveModels, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Brands:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: saveModels, purchasability: null,
                        domains: null
                    };
                    break;
                case FieldGroupType.Purchasibilty:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: saveModels,
                        domains: null
                    };
                    break;
                case FieldGroupType.Domains:
                    saveProductModels = {
                        productFieldModels: null, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: saveModels
                    };
                    break;
                default:
                    saveProductModels = {
                        productFieldModels: saveModels, dimensions: null, identifiers: null, seoInfo: null, pricing: null, mediaModel: null,
                        description: null, shipping: null, collections: null, categories: null, giftWraps: null, brands: null, purchasability: null,
                        domains: null
                    };
                    break;
            }
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.PostData(url + 'SaveProductFieldData', params, saveProductModels, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }


        //Save Order Data 
        async function saveOrderFieldData(fieldGroup, saveModels) {
            let result;
            let params = { fieldGroup };
            let saveOrderModels = {
                basicInfo: []
            };

            switch (fieldGroup) {
                case OrderFieldGroup.BasicInfo:
                    saveOrderModels = {
                        basicInfo: saveModels
                    };
                    break;
                default:
                    break;
            }
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.PostData(url + 'SaveOrderFieldData', params, saveOrderModels, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }
        
        //Get Order Tree
        async function getOrdersTree() {
            let result;
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.GetData(url + 'GetOrdersTreeData', {}, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result
        }

        //Get Orders
        async function getOrders(orderGroup, ids, fromDate, toDate) {
            let result;
            let params = { orderGroup, ids, fromDate, toDate };
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.GetData(url + 'GetOrdersData', params, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        //Get Orders Filed Info
        async function getOrderFieldData(fieldGroup, Ids) {
            let result;
            let params = { fieldGroup };
            let orderIds = { orderIds: Ids }
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.PostData(url + 'GetOrderFieldData', params, orderIds, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        async function removeImage(productId, model) {
            let result;
            let params = { productId };
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.PostData(url + 'RemoveImage', params, model, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        async function removeUrl(productId, model) {
            let result;
            let params = { productId };
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.PostData(url + 'DeleteVideoUrl', params, model, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        async function getOrgDocStatusConfig(status) {
            let result;
            let params = { status: status };
            await new Promise<void>((resolve) => setTimeout(() => {
                thisComponent.GetData(url + 'GetStatusUpdateById', params, function (x) {
                    result = x;
                    resolve();
                });
            }));
            return result;
        }

        function exportExcel(viewType, productGroupTypes, treeId, ids) {
            var exportUrl = url + "ExportExcel";
            var form = $('<form target="_blank" action="' + exportUrl + '" method="post">' +
                '<input type="hidden" name="ViewType" value="' + viewType + '" />' +
                '<input type="hidden" name="ProductGroupTypes" value="' + productGroupTypes + '" />' +
                '<input type="hidden" name="Id" value="' + treeId + '" />' +
                '<input type="hidden" name="ProductIds" value="' + ids + '" />' +
                '</form>');
            $('body').append(form);
            form.submit();
        }

        function exportOrdersGridToExcel(viewType, orderGroupTypes, treeId, ids, fromDate, toDate) {
            var exportUrl = url + "ExportOrderToExcel";
            var form = $('<form target="_blank" action="' + exportUrl + '" method="post">' +
                '<input type="hidden" name="ViewType" value="' + viewType + '" />' +
                '<input type="hidden" name="OrderGroupTypes" value="' + orderGroupTypes + '" />' +
                '<input type="hidden" name="Id" value="' + treeId + '" />' +
                '<input type="hidden" name="OrderIds" value="' + ids + '" />' +
                '<input type="hidden" name="FromDate" value="' + fromDate + '" />' +
                '<input type="hidden" name="ToDate" value="' + toDate + '" />' +
                '</form>');
            $('body').append(form);
            form.submit();
        }

        function exportOrderDetailsToExcel(fieldGroup, ids) {
            var exportUrl = url + "ExportOrderDetailsToExcel";
            var form = $('<form target="_blank" action="' + exportUrl + '" method="post">' +
                '<input type="hidden" name="FieldGroup" value="' + fieldGroup + '" />' +
                '<input type="hidden" name="OrderIds" value="' + ids + '" />' +
                '</form>');
            $('body').append(form);
            form.submit();
        }

        //TODO remove on multiselect in GRID
        function setCheckBox(selectedList) {
            products.forEach(function (record) {
                selectedList.forEach(function (selectedRecord) {
                    if (record.id == selectedRecord.id) {
                        record.isSelected = true;
                    }
                })
            });
        };

        //Attach UI Components to Layout
        thisComponent.layoutContainer.cell(headerBarContainer).attach(thisComponent.headerToolBar);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductEditor.Wed.Models.Enums
{
    public enum ProductGroupTypes
    {
        None = 0,
        Brand = 1,
        Category = 2,
        Collection = 3
    }
    public enum AcknowledgeType
    {
        Error = 0,
        Success = 1
    }
    public enum ProductStatus
    {
        None = 0,
        Draft = 1,
        Active = 2,
        Archived = 3,
        Discontinued = 4
    }

    public enum ItemTypes
    {
        Product = 1,
        Service = 2,
        // RentalAsset = 3,
        GiftCard = 4,
        GiftBox = 189,
        GiftBoxLine = 202,
        //Variant = 6,
        //Virtual = 5,
        GiftWrap = 11,
        Bundle = 7,
        DynamicBundle = 8,
        Addon = 10
    }

    public enum ProductFieldGroup
    {
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
        //, RelatedProduct, GiftWrapConfig, Personalization
    }

    public enum OrderFieldGroup
    {
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

    public enum MediaType
    {
        Image,
        Video
    }

    public enum GridViewType
    {
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

    public enum ShippingMethodTypes
    {
        None = 0,
        Standard = 1,
        Express = 2,
        Nominated = 3,
        Pickup = 4,
        //CollectPlus = 5,
        //Shutl = 6,
    }

    public enum GiftWrapTypes
    {
        None = 0,
        WholeOrder = 1,
        LineItems = 2
    }

    public enum PurchasabilityType
    {
        OnlineStore = 1,
        PreOrder,
        ForwardOrder
    }

    public enum OrderGroupTypes
    {
        None = 0,
        OrderStatus = 1,
        OrderPeriod = 2
    }

    public enum OrderStatus : int
    {
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

    public enum OrderPeriod
    {
        All = 3000,
        Today = 3001,
        TwoDays = 3002,
        ThreeDays = 3003,
        FiveDays = 3004,
        TenDays = 3005,
        FifteenDays = 3006,
        ThirtyDays = 3007,
        ThreeMonths = 3008,
        SixMonths = 3009,
        OneYear = 3010,
        OrderFrom = 3011
    }
    public enum PaymentStatus : int
    {

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

    public enum DomainCondition
    {
        None = 0,
        New = 1
    }
    public enum BundleType
    {
        BOM = 0,
        Complementary = 1
    }
    public enum BundleDisplayType
    {
        Grouped = 0,
        Saperated = 1
    }
    public enum BundlePricetype
    {
        SumofAllProductPrice = 0,
        CustomPrice = 1
    }

    public enum ProductMasterDataType
    {
        Brand = 1,
        Subbrand = 2,
        Category = 3,
        ProductCollection = 4,
        RelationTypes = 5,
        AttributeSet = 6,
        Attributes = 7,
        GiftWrappingItems = 8,
        TaxClass = 9,
        VariantAttributes = 10,
        //beyond this point are the enum based Items, the bove ones are dynamic records specific to each business
        ItemTypes = 21,
        //ProductGroup = 22,
        ShippingMethodTypes = 23,
        GiftWrapTypes = 24,
        DomainConditions = 25,
        RelatedProductAutoRuleTypes = 26,
        RelatedProductTypeCode = 27,
        RelatedProductSortBy = 28,
        ProductsByCategory = 29,
        SubBrandByOrgDomain = 30,
        SubCategoryByOrgDomain = 31,
        BundlesList = 32,
        DisplayInSearch = 33,
        CountriesList = 34,
        OmsSuppliers = 35,
        ProductStatus = 36,
        ReplacementProductLevelTypes = 37,
        ReplacementProductSearchBy = 38
    }

    public enum RelatedProductAutoRuleTypes
    {
        SameSubBrand = 1,
        SameBrand = 2,
        SameRootCategory = 3,
        SameSubCategory = 4,
        //SelectedSubBrand = 5,
        //SelectedBrand = 6,
        //SelectedRootCategory = 7,
        //SelectedSubCategory = 8
    }

    //public static class RelatedProductTypeCode
    //{
    //    public const string GWP = "GWP";
    //    public const string UPGRADE = "UPGRADE";
    //    public const string ALSOLIKE = "ALSOLIKE";
    //    public const string ALSONEED = "ALSONEED";
    //    public const string BASKETGROUP = "BASKETGROUP";
    //    public const string ADDONS = "ADDONS";
    //}

    public enum RelatedProductTypeCode
    {
        GWP = 1,
        UPGRADE = 2,
        ALSOLIKE = 3,
        ALSONEED = 4,
        BASKETGROUP = 5,
        ADDONS = 6,
        ALTERNATIVE = 7,
        WORKSWITH = 8
    }

    public enum RelatedProductAutoSortBy
    {
        PriceLowToHigh = 1,
        PriceHighToLow = 2,
        BestSellers = 9,
        ByReviews = 10
    }
    public enum InputTypes
    {
        Textbox = 1,
        Dropdown = 2,
        Checkbox = 3,
        Radiobutton = 4,
        Textarea = 5,
        File = 6,
        Editor = 7,
        ColorPicker = 8
    }
    public enum VariantDisplayInSearch
    {
        Rollup = 1,
        Expanded = 2
    }

    public enum ValidationType
    {
        None = 0,
        SKU = 1
    }

    public enum MassUpdaterType
    {
        Product = 0,
        Order = 1
    }

    public enum OrderType
    {
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
    public enum UrlSchemaTypes
    {
        http,
        https
    }
    public enum ReplacementProductLevelTypes
    {
        StockCode = 1,
        VariantGroupCode = 2,
        ProductCode = 3
    }
    public enum ReplacementProductSearchBy
    {
        SearchByStockCode = 1,
        SearchByCategory = 2
    }
}
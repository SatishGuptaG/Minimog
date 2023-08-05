using System.Configuration;
using System;
using System.Web;
using System.Web.Optimization;

namespace ProductEditor.Wed
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var CDNVersion = ConfigurationManager.AppSettings.Get("CDNVersion") ?? "1.0";
            var Url = ConfigurationManager.AppSettings.Get("CDNUrl");
            var UseCDN = ConfigurationManager.AppSettings.Get("UseCDN");
            var cdnUrl = Url + "{0}?v=" + CDNVersion; //Azure CDN does not support custom domain names with SSL

            BundleTable.Bundles.UseCdn = Convert.ToBoolean(UseCDN ?? "false");

            //JS REQUIRED IN ADMIN THEME
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/admin1-js", string.Format(cdnUrl, "/bundles/admin1-js")).Include(
                "~/assets/js/vendor/vendor.min.js",
                "~/assets/libs/flatpickr/flatpickr.min.js",
                "~/assets/libs/jquery-knob/jquery.knob.min.js",
                "~/assets/libs/jquery-sparkline/jquery.sparkline.min.js",
                "~/assets/libs/flot-charts/jquery.flot.js",
                "~/assets/libs/flot-charts/jquery.flot.time.js",
                "~/assets/libs/flot-charts/jquery.flot.tooltip.min.js",
                "~/assets/libs/flot-charts/jquery.flot.selection.js",
                "~/assets/libs/flot-charts/jquery.flot.crosshair.js"
            ));

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/dashboardv1-js", string.Format(cdnUrl, "/bundles/dashboardv1-js")).Include(
                "~/assets/js/pages/dashboard-1.init.js"
                ));
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/dashboardv2-js", string.Format(cdnUrl, "/bundles/dashboardv2-js")).Include(
                "~/assets/libs/jquery-vectormap/jquery-jvectormap-1.2.2.min.js",
                "~/assets/libs/jquery-vectormap/jquery-jvectormap-world-mill-en.js",
                "~/assets/js/pages/dashboard-2.init.js"
           ));
            //JS REQUIRED IN ADMIN THEME (**REQUIRED)
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/admin-js", string.Format(cdnUrl, "/bundles/admin-js")).Include(
                "~/assets/js/vendor/vendor.min.js"
            ));

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/main-js", string.Format(cdnUrl, "/bundles/main-js")).Include(
                    "~/assets/js/vendor/app.min.js"
            ));
            //MENU JS BUNDLE
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/slider-menu-js", string.Format(cdnUrl, "/bundles/slider-menu-js")).Include(
                "~/assets/js/pages/slideMenu.js",
                "~/assets/libs/moment.min.js"
            ));
            //FORMS BUNDLES
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/advance-form-js", string.Format(cdnUrl, "/bundles/advance-form-js")).Include(
                "~/assets/libs/jquery-nice-select/jquery.nice-select.min.js",
                "~/assets/libs/switchery/switchery.min.js",
                "~/assets/libs/multiselect/jquery.multi-select.js",
                "~/assets/libs/select2/select2.min.js",
                "~/assets/libs/jquery-mockjax/jquery.mockjax.min.js",
                "~/assets/libs/autocomplete/jquery.autocomplete.min.js",
                "~/assets/libs/bootstrap-select/bootstrap-select.min.js",
                "~/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js",
                "~/assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js",
                "~/assets/js/pages/form-advanced.init.js"
            ));

            //NEW CLEAN LAYOUT JS AND CSS BUNDLE

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/platform-js", string.Format(cdnUrl, "/bundles/platform-js")).Include(
                "~/assets/js/vendor/vendor.min.js",
                "~/assets/js/vendor/app.min.js",
                "~/assets/libs/angular/angular.js",
                "~/assets/js/angularapp/app.js",
                "~/assets/js/angularapp/controllers/globalCtrl.js",
                "~/assets/libs/select2/select2.min.js"
            ));

            //CSS REQUIRED IN ADMIN THEME
            BundleTable.Bundles.Add(new Bundle("~/bundles/platform-css", string.Format(cdnUrl, "/bundles/platform-css")).Include(
                "~/assets/libs/jquery-vectormap/jquery-jvectormap-1.2.2.css",
                "~/assets/libs/sweetalert2/sweetalert2.min.css",
                "~/assets/css/bootstrap.min.css",
                "~/assets/css/icons.min.css",
                "~/assets/css/app.min.css",
                "~/assets/css/vue-treeselect.min.css",
                "~/assets/css/select2.min.css"
            ));

            BundleTable.Bundles.Add(new Bundle("~/bundles/vue-js", string.Format(cdnUrl, "/bundles/vue-js")).Include(
                "~/assets/libs/vuejs/vuedraggable.min.js",
                "~/assets/libs/vuejs/vue.min.js",
                "~/assets/libs/vuejs/jquery.js",
                "~/assets/libs/vuejs/jquery-ui.min.js",
                "~/assets/libs/vuejs/axios.min.js",
                "~/assets/libs/vuejs/select2.js",
                "~/assets/libs/moment/moment.min.js",
                "~/assets/libs/vuejs/vee-validate.js",
                "~/assets/libs/vuejs/index.min.js",
                "~/assets/libs/vuejs/vue-toasted.min.js",
                "~/assets/libs/vuejs/vue-treeselect.umd.min.js",
                "~/assets/libs/vuejs/vuejs-datepicker.min.js",
                "~/assets/libs/vuejs/vuejs-paginate.js",
                "~/assets/libs/vuejs/vue-router.js",
                "~/assets/libs/vuejs/v-tooltip.min.js",
                "~/assets/js/helpers/utils.js"
            ));

            BundleTable.Bundles.Add(new Bundle("~/bundles/admin-style", string.Format(cdnUrl, "/bundles/admin-style")).Include(
                "~/assets/libs/animate/animate.min.css",
                "~/assets/libs/jquery-vectormap/jquery-jvectormap-1.2.2.css",
                "~/assets/libs/sweetalert2/sweetalert2.min.css",
                "~/assets/libs/flatpickr/flatpickr.min.css",
                "~/assets/css/bootstrap.css",
                "~/assets/css/icons.min.css",
                "~/assets/css/app.min.css",
                "~/assets/css/temp.css",
                "~/assets/css/vue-treeselect.min.css",
                "~/assets/css/select2.min.css"
            ));

            BundleTable.Bundles.Add(new Bundle("~/bundles/style-advance-form", string.Format(cdnUrl, "/bundles/style-advance-form")).Include(
                "~/assets/libs/jquery-nice-select/nice-select.css",
                "~/assets/libs/switchery/switchery.min.css",
                "~/assets/libs/multiselect/multi-select.css",
                "~/assets/libs/select2/select2.min.css",
                "~/assets/libs/bootstrap-select/bootstrap-select.min.css",
                "~/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.css"
            ));

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/vue-main-js", string.Format(cdnUrl, "/bundles/vue-main-js")).Include(
                "~/assets/libs/vuejs/vuedraggable.min.js",
                "~/assets/libs/vuejs/vue.min.js",
                "~/assets/libs/vuejs/jquery.js",
                "~/assets/libs/vuejs/jquery-ui.min.js",
                "~/assets/libs/vuejs/axios.min.js",
                "~/assets/libs/vuejs/select2.js",
                "~/assets/libs/moment/moment.min.js",
                "~/assets/libs/vuejs/vee-validate.js",
                "~/assets/libs/vuejs/index.min.js",
                "~/assets/libs/vuejs/vue-toasted.min.js",
                "~/assets/libs/vuejs/vue-treeselect.umd.min.js",
                "~/assets/libs/vuejs/vuejs-datepicker.min.js",
                "~/assets/libs/vuejs/vuejs-paginate.js",
                //"~/assets/libs/vuejs/vue-router.js",
                "~/assets/libs/vuejs/v-tooltip.min.js",
                "~/assets/js/helpers/utils.js",
                "~/assets/js/producteditor/select2.js"
            ));

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/prodeditor-form-js", string.Format(cdnUrl, "/bundles/prodeditor-form-js")).Include(
                    "~/assets/libs/vuejs/vee-validate.js",
                    "~/assets/libs/vuejs/index.min.js",
                    "~/assets/libs/vuejs/vue-toasted.min.js",
                    "~/assets/libs/vuejs/vue-treeselect.umd.min.js",
                    "~/assets/libs/vuejs/vuejs-datepicker.min.js",
                    "~/assets/libs/vuejs/vuejs-paginate.js",
                    "~/assets/libs/vuejs/vue-router.js",
                    "~/assets/libs/vuejs/v-tooltip.min.js",
                    "~/assets/js/helpers/utils.js"
            ));

            BundleTable.Bundles.Add(new Bundle("~/bundles/prodeditor-form-css", string.Format(cdnUrl, "/bundles/prodeditor-form-css")).Include(
                "~/assets/css/vue-treeselect.min.css",
                "~/assets/css/select2.min.css"
            ));

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/add-product-js", string.Format(cdnUrl, "/bundles/add-product-js"))
                .Include("~/assets/js/producteditor/01_Basic.js")
                .Include("~/assets/js/producteditor/02_Description.js")
                .Include("~/assets/js/producteditor/04_Identifiers.js")
                .Include("~/assets/js/producteditor/03_Images.js")
                .Include("~/assets/js/producteditor/11_Dimensions.js")
                .Include("~/assets/js/producteditor/08_Attributes.js")
                .Include("~/assets/js/producteditor/21_AdvancedPurchaseData.js")
                .Include("~/assets/js/producteditor/31_Supplier.js")
                .Include("~/assets/js/producteditor/05_Pricing.js")
                .Include("~/assets/js/producteditor/06_Inventory.js")
                .Include("~/assets/js/producteditor/07_Variations.js")
                .Include("~/assets/js/producteditor/10_RelatedProducts.js")
                .Include("~/assets/js/producteditor/20_Domains.js")
                .Include("~/assets/js/producteditor/addproduct.js")
            );

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/edit-product-js", string.Format(cdnUrl, "/bundles/edit-product-js"))
                .Include("~/assets/js/producteditor/01_Basic.js")
                .Include("~/assets/js/producteditor/02_Description.js")
                .Include("~/assets/js/producteditor/04_Identifiers.js")
                .Include("~/assets/js/producteditor/03_Images.js")
                .Include("~/assets/js/producteditor/11_Dimensions.js")
                .Include("~/assets/js/producteditor/28_Completeness.js")
                .Include("~/assets/js/producteditor/08_Attributes.js")
                .Include("~/assets/js/producteditor/26_AdvancedPurchaseDataReadonly.js")
                .Include("~/assets/js/producteditor/31_Supplier.js")
                .Include("~/assets/js/producteditor/05_Pricing.js")
                .Include("~/assets/js/producteditor/06_Inventory.js")
                .Include("~/assets/js/producteditor/07_Variations.js")
                .Include("~/assets/js/producteditor/09_DynamicCollections.js")
                .Include("~/assets/js/producteditor/10_RelatedProducts.js")
                .Include("~/assets/js/producteditor/16_Bundles.js")
                .Include("~/assets/js/producteditor/12_Purchasability.js")
                .Include("~/assets/js/producteditor/14_SEO.js")
                .Include("~/assets/js/producteditor/13_GiftWrapping.js")
                .Include("~/assets/js/producteditor/20_Domains.js")
                .Include("~/assets/js/producteditor/30_Channels.js")
                .Include("~/assets/js/producteditor/editproduct.js")
            );

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/variant-product-js", string.Format(cdnUrl, "/bundles/variant-product-js"))
                .Include("~/assets/js/producteditor/01_Basic.js")
                .Include("~/assets/js/producteditor/25_VariantBasicInfo.js")
                .Include("~/assets/js/producteditor/31_VariationsLevel2.js")
                .Include("~/assets/js/producteditor/02_Description.js")
                .Include("~/assets/js/producteditor/03_Images.js")
                .Include("~/assets/js/producteditor/04_Identifiers.js")
                .Include("~/assets/js/producteditor/29_VariantAttributes.js")
                .Include("~/assets/js/producteditor/26_AdvancedPurchaseDataReadonly.js")
                .Include("~/assets/js/producteditor/05_PricingVariant.js")
                .Include("~/assets/js/producteditor/28_Completeness.js")
                .Include("~/assets/js/producteditor/06_Inventory.js")
                .Include("~/assets/js/producteditor/10_RelatedProducts.js")
                .Include("~/assets/js/producteditor/12_Purchasability.js")
                .Include("~/assets/js/producteditor/14_SEO.js")
                .Include("~/assets/js/producteditor/27_DomainVariant.js")
                .Include("~/assets/js/producteditor/30_Channels.js")
                .Include("~/assets/js/producteditor/updatevariant.js")
            );

            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/variant-product-level2-js", string.Format(cdnUrl, "/bundles/variant-product-level2-js"))
                 .Include("~/assets/js/producteditor/01_Basic.js")
                 .Include("~/assets/js/producteditor/25_VariantBasicInfo.js")
                 .Include("~/assets/js/producteditor/02_Description.js")
                 .Include("~/assets/js/producteditor/03_Images.js")
                 .Include("~/assets/js/producteditor/04_Identifiers.js")
                 .Include("~/assets/js/producteditor/29_VariantAttributes.js")
                 .Include("~/assets/js/producteditor/31_VariationsLevel2.js")
                 .Include("~/assets/js/producteditor/26_AdvancedPurchaseDataReadonly.js")
                 .Include("~/assets/js/producteditor/05_PricingVariant.js")
                 .Include("~/assets/js/producteditor/updatevariantlevel2.js")
             );
        }
    }
}

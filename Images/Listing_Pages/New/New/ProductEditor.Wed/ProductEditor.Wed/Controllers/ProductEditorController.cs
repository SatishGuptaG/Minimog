using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProductEditor.Wed.Controllers
{
    public class ProductEditorController : Controller
    {
        // GET: ProductEditor
        public ActionResult Index()
        {
            //var currentdomain = _sessionContext.CurrentDomain;
            //ViewBag.domainid = currentdomain?.RecordId;
            //var catalogSettings = currentdomain.CatalogSettings;

            //var advPurchaseData = currentdomain != null && currentdomain.FeatureToggleSettings != null ? currentdomain.FeatureToggleSettings.AdvancedPurchaseFeatureEnabled : false;
            //var productDevelopmentEnabled = currentdomain != null && currentdomain.FeatureToggleSettings != null ? currentdomain.FeatureToggleSettings.ProductDevelopmentEnabled : false;
            //var advancedFormulas = currentdomain.AdvancedPriceCalcFormulaSettings != null ? currentdomain.AdvancedPriceCalcFormulaSettings : null;

            //ViewBag.AdvancedPurchaseDataFeatureToggle = advPurchaseData;
            //ViewBag.ProductDevelopmentFeatureToggle = productDevelopmentEnabled;
            //ViewBag.BaseCurrencySymbol = currentdomain.RegionalSettings.DefaultCurrencyCode.ToCurrencySymbol();
            //ViewBag.AdvancedFormulas = advancedFormulas;
            //ViewBag.Decimalvalues = currentdomain.RegionalSettings.CurrencyDigitsAfterDecimal;
            //ViewBag.EnableProductFamily = catalogSettings?.EnableProductFamily != null ? catalogSettings.EnableProductFamily : false;
            //ViewBag.EnableLifecycle = catalogSettings?.EnableLifecycle != null ? catalogSettings.EnableLifecycle : false;

            return View("AddProduct");
        }
    }
}

let wsApiUrl;
let testEnv = false;
wsApiUrl = "https://recurring-payment-api.webrexstudio.com";
// wsApiUrl = "https://recurring-payment-api-stg.webrexstudio.com";
// wsApiUrl = "http://localhost:3000";
const wsUrlParams = new URLSearchParams(location.search);
// let ws_shop_url = urlParams.get('shop');
// wscc_shop = ws_shop_url ? ws_shop_url : WSConfig.shop;


window.changeDropdownStatus = (id) => {
    let sAnimationIn = ws_css.sAnimationIn ? ws_css.sAnimationIn : "fadeInUp";
    let sAnimationOut = ws_css.sAnimationOut ? ws_css.sAnimationOut : "fadeOutDown";
    let dropdown = document.querySelector("#ws_dropdown_" + id);
    if (dropdown) {
        dropdown.classList.toggle("active");
        // let dropdownlist = dropdown.querySelector(".ws-dropdown-list");

        // if (dropdown.classList.contains("active")) {
        //     if (dropdownlist) {
        //         dropdownlist.classList.remove("animate__" + sAnimationIn);
        //         dropdownlist.classList.add("animate__" + sAnimationOut);
        //     }
        // } else {
        //     if (dropdownlist) {
        //         dropdownlist.style.display = 'block';
        //         dropdownlist.classList.add("animate__" + sAnimationIn);
        //         dropdownlist.classList.remove("animate__" + sAnimationOut);
        //     }
        // }
        // let dropdownlist = dropdown.querySelector(".ws-dropdown-list");
        // if (dropdownlist) dropdownlist.classList.add("animate__fadeInUp");
    }

}

//
let ws_shop_url = wsUrlParams.get('shop');
let ws_env = wsUrlParams.get('env');
if (ws_env && ws_env == "stage") {
    wsApiUrl = "https://recurring-payment-api-stg.webrexstudio.com";
}

let tmpShopUrl = ws_shop_url ? ws_shop_url : (Shopify && Shopify.shop ? Shopify.shop : null);
wscc_shop = tmpShopUrl ? tmpShopUrl : (WSConfig && WSConfig.shop ? WSConfig.shop : null);

let wstestEnv = wsUrlParams.get('test') && wsUrlParams.get('test').toLowerCase() == 'ws' ? true : false;
var ws_selectors = { "accountMobSelector": { "selector": ".myaccount__account-details", "addOn": "first child", "customSelector": false }, "accountWebSelector": { "selector": ".myaccount__account-details", "addOn": "first child", "customSelector": false }, "productMobSelector": { "selector": "[action='/cart/add']", "addOn": "first child", "customSelector": false }, "productWebSelector": { "selector": "[action='/cart/add']", "addOn": "first child", "customSelector": false }, "themeName": "debut" }
var ws_lang = { "purchaseOption": "Purchase Options", "oneTime": "One Time Purchase" };
var ws_css = "<style></style>";
var ws_window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var sellingGroups = [];
var currentVariant, plansGroups, selectionOption, selectedVariantId, temp1SelectedGroup, sellingGroupsCount, divEle, WSConfig;
var Shopify = Shopify || {};
var ws_user_currency = Shopify && Shopify.currency && Shopify.currency.active ? Shopify.currency.active : "NOTFOUND";
var ws_currencies = {
    "AED": {
        "currency": "AED",
        "symbol": "د.إ",
        "moneyFormat": "د.إ{{amount}} AED",
        "decimal": 2
    },
    "AFN": {
        "currency": "AFN",
        "symbol": "؋",
        "moneyFormat": "Af {{amount}}",
        "decimal": 0
    },
    "ALL": {
        "currency": "ALL",
        "symbol": "L",
        "moneyFormat": "Lek {{amount}}",
        "decimal": 0
    },
    "AMD": {
        "currency": "AMD",
        "symbol": "դր.",
        "moneyFormat": "{{amount}}",
        "decimal": 0
    },
    "ANG": {
        "currency": "ANG",
        "symbol": "ƒ",
        "moneyFormat": "ƒ {{amount}}",
        "decimal": 2
    },
    "AOA": {
        "currency": "AOA",
        "symbol": "Kz",
        "moneyFormat": "Kz{{amount}}",
        "decimal": 0
    },
    "ARS": {
        "currency": "ARS",
        "symbol": "$",
        "moneyFormat": "${{amount_with_comma_separator}}",
        "decimal": 0
    },
    "AUD": {
        "currency": "AUD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "AWG": {
        "currency": "AWG",
        "symbol": "ƒ",
        "moneyFormat": "Afl{{amount}}",
        "decimal": 2
    },
    "AZN": {
        "currency": "AZN",
        "symbol": "₼",
        "moneyFormat": "₼{{amount}}",
        "decimal": 2
    },
    "BAM": {
        "currency": "BAM",
        "symbol": "КМ",
        "moneyFormat": "KM {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "BBD": {
        "currency": "BBD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "BDT": {
        "currency": "BDT",
        "symbol": "৳",
        "moneyFormat": "Tk {{amount}}",
        "decimal": 0
    },
    "BGN": {
        "currency": "BGN",
        "symbol": "лв.",
        "moneyFormat": "{{amount}} лв",
        "decimal": 2
    },
    "BIF": {
        "currency": "BIF",
        "symbol": "Fr",
        "moneyFormat": "BIF {{amount}}",
        "decimal": 0
    },
    "BMD": {
        "currency": "BMD",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 2
    },
    "BND": {
        "currency": "BND",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "BOB": {
        "currency": "BOB",
        "symbol": "Bs.",
        "moneyFormat": "Bs{{amount_with_comma_separator}}",
        "decimal": 2
    },
    "BRL": {
        "currency": "BRL",
        "symbol": "R$",
        "moneyFormat": "R$ {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "BSD": {
        "currency": "BSD",
        "symbol": "$",
        "moneyFormat": "BS${{amount}}",
        "decimal": 2
    },
    "BWP": {
        "currency": "BWP",
        "symbol": "P",
        "moneyFormat": "P{{amount}}",
        "decimal": 2
    },
    "BZD": {
        "currency": "BZD",
        "symbol": "$",
        "moneyFormat": "BZ${{amount}}",
        "decimal": 2
    },
    "CAD": {
        "currency": "CAD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "CDF": {
        "currency": "CDF",
        "symbol": "Fr",
        "moneyFormat": "FC {{amount}}",
        "decimal": 0
    },
    "CHF": {
        "currency": "CHF",
        "symbol": "CHF",
        "moneyFormat": "CHF {{amount}}",
        "decimal": 2
    },
    "CLP": {
        "currency": "CLP",
        "symbol": "$",
        "moneyFormat": "${{amount_no_decimals}}",
        "decimal": 0
    },
    "CNY": {
        "currency": "CNY",
        "symbol": "¥",
        "moneyFormat": "¥{{amount}}",
        "decimal": 2
    },
    "COP": {
        "currency": "COP",
        "symbol": "$",
        "moneyFormat": "${{amount_with_comma_separator}}",
        "decimal": 0
    },
    "CRC": {
        "currency": "CRC",
        "symbol": "₡",
        "moneyFormat": "₡ {{amount_with_comma_separator}}",
        "decimal": 0
    },
    "CVE": {
        "currency": "CVE",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 0
    },
    "CZK": {
        "currency": "CZK",
        "symbol": "Kč",
        "moneyFormat": "{{amount_with_comma_separator}} Kč",
        "decimal": 2
    },
    "DJF": {
        "currency": "DJF",
        "symbol": "Fdj",
        "moneyFormat": "DJF {{amount}}",
        "decimal": 0
    },
    "DKK": {
        "currency": "DKK",
        "symbol": "kr.",
        "moneyFormat": "kr {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "DOP": {
        "currency": "DOP",
        "symbol": "$",
        "moneyFormat": "RD$ {{amount}}",
        "decimal": 0
    },
    "DZD": {
        "currency": "DZD",
        "symbol": "د.ج",
        "moneyFormat": "DA {{amount}}",
        "decimal": 0
    },
    "EGP": {
        "currency": "EGP",
        "symbol": "ج.م",
        "moneyFormat": "LE {{amount}}",
        "decimal": 2
    },
    "ETB": {
        "currency": "ETB",
        "symbol": "Br",
        "moneyFormat": "Br{{amount}}",
        "decimal": 0
    },
    "EUR": {
        "currency": "EUR",
        "symbol": "€",
        "moneyFormat": "{{amount_with_comma_separator}}€",
        "decimal": 2
    },
    "FJD": {
        "currency": "FJD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "FKP": {
        "currency": "FKP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}}",
        "decimal": 2
    },
    "GBP": {
        "currency": "GBP",
        "symbol": "£",
        "moneyFormat": "£{{amount}}",
        "decimal": 2
    },
    "GEL": {
        "currency": "GEL",
        "symbol": "ლ",
        "moneyFormat": "{{amount}} GEL",
        "decimal": 2
    },
    "GIP": {
        "currency": "GIP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}}",
        "decimal": 2
    },
    "GMD": {
        "currency": "GMD",
        "symbol": "D",
        "moneyFormat": "D {{amount}}",
        "decimal": 0
    },
    "GNF": {
        "currency": "GNF",
        "symbol": "Fr",
        "moneyFormat": "FG {{amount}}",
        "decimal": 0
    },
    "GTQ": {
        "currency": "GTQ",
        "symbol": "Q",
        "moneyFormat": "Q{{amount}}",
        "decimal": 2
    },
    "GYD": {
        "currency": "GYD",
        "symbol": "$",
        "moneyFormat": "G${{amount}}",
        "decimal": 0
    },
    "HKD": {
        "currency": "HKD",
        "symbol": "$",
        "moneyFormat": "HK${{amount}}",
        "decimal": 2
    },
    "HNL": {
        "currency": "HNL",
        "symbol": "L",
        "moneyFormat": "L {{amount}}",
        "decimal": 2
    },
    "HRK": {
        "currency": "HRK",
        "symbol": "kn",
        "moneyFormat": "{{amount_with_comma_separator}} kn",
        "decimal": 2
    },
    "HTG": {
        "currency": "HTG",
        "symbol": "G",
        "moneyFormat": "G {{amount}}",
        "decimal": 0
    },
    "HUF": {
        "currency": "HUF",
        "symbol": "Ft",
        "moneyFormat": "{{amount_no_decimals_with_comma_separator}}",
        "decimal": 0
    },
    "IDR": {
        "currency": "IDR",
        "symbol": "Rp",
        "moneyFormat": "{{amount_with_comma_separator}} IDR",
        "decimal": 0
    },
    "ILS": {
        "currency": "ILS",
        "symbol": "₪",
        "moneyFormat": "₪{{amount}}",
        "decimal": 2
    },
    "INR": {
        "currency": "INR",
        "symbol": "₹",
        "moneyFormat": "₹ {{amount}}",
        "decimal": 0
    },
    "ISK": {
        "currency": "ISK",
        "symbol": "kr",
        "moneyFormat": "{{amount_no_decimals}} kr",
        "decimal": 0
    },
    "JMD": {
        "currency": "JMD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 0
    },
    "JPY": {
        "currency": "JPY",
        "symbol": "¥",
        "moneyFormat": "¥{{amount_no_decimals}}",
        "decimal": 0
    },
    "KES": {
        "currency": "KES",
        "symbol": "KSh",
        "moneyFormat": "KSh{{amount}}",
        "decimal": 0
    },
    "KGS": {
        "currency": "KGS",
        "symbol": "som",
        "moneyFormat": "лв{{amount}}",
        "decimal": 0
    },
    "KHR": {
        "currency": "KHR",
        "symbol": "៛",
        "moneyFormat": "KHR{{amount}}",
        "decimal": 0
    },
    "KMF": {
        "currency": "KMF",
        "symbol": "Fr",
        "moneyFormat": "CF {{amount}}",
        "decimal": 0
    },
    "KRW": {
        "currency": "KRW",
        "symbol": "₩",
        "moneyFormat": "₩{{amount_no_decimals}}",
        "decimal": 0
    },
    "KYD": {
        "currency": "KYD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "KZT": {
        "currency": "KZT",
        "symbol": "〒",
        "moneyFormat": "{{amount}} KZT",
        "decimal": 0
    },
    "LAK": {
        "currency": "LAK",
        "symbol": "₭",
        "moneyFormat": "₭ {{amount}}",
        "decimal": 0
    },
    "LBP": {
        "currency": "LBP",
        "symbol": "ل.ل",
        "moneyFormat": "L.L.{{amount}}",
        "decimal": 0
    },
    "LKR": {
        "currency": "LKR",
        "symbol": "₨",
        "moneyFormat": "Rs {{amount}}",
        "decimal": 0
    },
    "LRD": {
        "currency": "LRD",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 0
    },
    "LSL": {
        "currency": "LSL",
        "symbol": "L",
        "moneyFormat": "L {{amount}}",
        "decimal": 2
    },
    "MAD": {
        "currency": "MAD",
        "symbol": "د.م.",
        "moneyFormat": "{{amount}} dh",
        "decimal": 2
    },
    "MDL": {
        "currency": "MDL",
        "symbol": "L",
        "moneyFormat": "{{amount}} MDL",
        "decimal": 2
    },
    "MKD": {
        "currency": "MKD",
        "symbol": "ден",
        "moneyFormat": "ден {{amount}}",
        "decimal": 0
    },
    "MMK": {
        "currency": "MMK",
        "symbol": "K",
        "moneyFormat": "K{{amount}}",
        "decimal": 0
    },
    "MNT": {
        "currency": "MNT",
        "symbol": "₮",
        "moneyFormat": "{{amount_no_decimals}} ₮",
        "decimal": 0
    },
    "MOP": {
        "currency": "MOP",
        "symbol": "P",
        "moneyFormat": "MOP${{amount}}",
        "decimal": 2
    },
    "MUR": {
        "currency": "MUR",
        "symbol": "₨",
        "moneyFormat": "Rs {{amount}}",
        "decimal": 0
    },
    "MVR": {
        "currency": "MVR",
        "symbol": "MVR",
        "moneyFormat": "Rf{{amount}}",
        "decimal": 2
    },
    "MWK": {
        "currency": "MWK",
        "symbol": "MK",
        "moneyFormat": "MK {{amount}}",
        "decimal": 0
    },
    "MXN": {
        "currency": "MXN",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 2
    },
    "MYR": {
        "currency": "MYR",
        "symbol": "RM",
        "moneyFormat": "RM{{amount}}",
        "decimal": 2
    },
    "MZN": {
        "currency": "MZN",
        "symbol": "MTn",
        "moneyFormat": "{{amount}} Mt",
        "decimal": 0
    },
    "NAD": {
        "currency": "NAD",
        "symbol": "$",
        "moneyFormat": "N${{amount}}",
        "decimal": 2
    },
    "NGN": {
        "currency": "NGN",
        "symbol": "₦",
        "moneyFormat": "₦{{amount}}",
        "decimal": 0
    },
    "NIO": {
        "currency": "NIO",
        "symbol": "C$",
        "moneyFormat": "C${{amount}}",
        "decimal": 0
    },
    "NOK": {
        "currency": "NOK",
        "symbol": "kr",
        "moneyFormat": "kr {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "NPR": {
        "currency": "NPR",
        "symbol": "₨",
        "moneyFormat": "Rs{{amount}}",
        "decimal": 0
    },
    "NZD": {
        "currency": "NZD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "PAB": {
        "currency": "PAB",
        "symbol": "B/.",
        "moneyFormat": "PAB {{amount}}",
        "decimal": 2
    },
    "PEN": {
        "currency": "PEN",
        "symbol": "S/.",
        "moneyFormat": "S/. {{amount}}",
        "decimal": 2
    },
    "PGK": {
        "currency": "PGK",
        "symbol": "K",
        "moneyFormat": "K {{amount}}",
        "decimal": 2
    },
    "PHP": {
        "currency": "PHP",
        "symbol": "₱",
        "moneyFormat": "₱{{amount}}",
        "decimal": 0
    },
    "PKR": {
        "currency": "PKR",
        "symbol": "₨",
        "moneyFormat": "Rs.{{amount}}",
        "decimal": 0
    },
    "PLN": {
        "currency": "PLN",
        "symbol": "zł",
        "moneyFormat": "{{amount_with_comma_separator}} zl",
        "decimal": 2
    },
    "PYG": {
        "currency": "PYG",
        "symbol": "₲",
        "moneyFormat": "Gs. {{amount_no_decimals_with_comma_separator}}",
        "decimal": 0
    },
    "QAR": {
        "currency": "QAR",
        "symbol": "ر.ق",
        "moneyFormat": "QAR {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "RON": {
        "currency": "RON",
        "symbol": "Lei",
        "moneyFormat": "{{amount_with_comma_separator}} lei",
        "decimal": 2
    },
    "RSD": {
        "currency": "RSD",
        "symbol": "РСД",
        "moneyFormat": "{{amount}} RSD",
        "decimal": 0
    },
    "RUB": {
        "currency": "RUB",
        "symbol": "₽",
        "moneyFormat": "₽ {{amount_with_comma_separator}}",
        "decimal": 0
    },
    "RWF": {
        "currency": "RWF",
        "symbol": "FRw",
        "moneyFormat": "{{amount_no_decimals}} RF",
        "decimal": 0
    },
    "SAR": {
        "currency": "SAR",
        "symbol": "ر.س",
        "moneyFormat": "﷼‎{{amount}}",
        "decimal": 2
    },
    "SBD": {
        "currency": "SBD",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 2
    },
    "SCR": {
        "currency": "SCR",
        "symbol": "₨",
        "moneyFormat": "Rs {{amount}}",
        "decimal": 2
    },
    "SEK": {
        "currency": "SEK",
        "symbol": "kr",
        "moneyFormat": "{{amount_with_comma_separator}} kr",
        "decimal": 2
    },
    "SGD": {
        "currency": "SGD",
        "symbol": "$",
        "moneyFormat": "S${{amount}}",
        "decimal": 2
    },
    "SHP": {
        "currency": "SHP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}}",
        "decimal": 2
    },
    "SLL": {
        "currency": "SLL",
        "symbol": "Le",
        "moneyFormat": "Le {{amount}}",
        "decimal": 0
    },
    "SRD": {
        "currency": "SRD",
        "symbol": "$",
        "moneyFormat": "$ {{amount}}",
        "decimal": 2
    },
    "STD": {
        "currency": "STD",
        "symbol": "Db",
        "moneyFormat": "Db {{amount}}",
        "decimal": 0
    },
    "SZL": {
        "currency": "SZL",
        "symbol": "E",
        "moneyFormat": "L {{amount}}",
        "decimal": 2
    },
    "THB": {
        "currency": "THB",
        "symbol": "฿",
        "moneyFormat": "{{amount}} THB",
        "decimal": 0
    },
    "TJS": {
        "currency": "TJS",
        "symbol": "ЅМ",
        "moneyFormat": "TJS {{amount}}",
        "decimal": 2
    },
    "TOP": {
        "currency": "TOP",
        "symbol": "T$",
        "moneyFormat": "T$ {{amount}}",
        "decimal": 2
    },
    "TRY": {
        "currency": "TRY",
        "symbol": "₺",
        "moneyFormat": "{{amount}} TL",
        "decimal": 2
    },
    "TTD": {
        "currency": "TTD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "TWD": {
        "currency": "TWD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 0
    },
    "TZS": {
        "currency": "TZS",
        "symbol": "Sh",
        "moneyFormat": "{{amount}} TZS",
        "decimal": 0
    },
    "UAH": {
        "currency": "UAH",
        "symbol": "₴",
        "moneyFormat": "₴{{amount}}",
        "decimal": 0
    },
    "UGX": {
        "currency": "UGX",
        "symbol": "USh",
        "moneyFormat": "Ush {{amount_no_decimals}}",
        "decimal": 0
    },
    "USD": {
        "currency": "USD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "UYU": {
        "currency": "UYU",
        "symbol": "$",
        "moneyFormat": "${{amount_with_comma_separator}}",
        "decimal": 0
    },
    "UZS": {
        "currency": "UZS",
        "symbol": "",
        "moneyFormat": "лв {{amount}}",
        "decimal": 0
    },
    "VND": {
        "currency": "VND",
        "symbol": "₫",
        "moneyFormat": "{{amount_no_decimals_with_comma_separator}}₫",
        "decimal": 0
    },
    "VUV": {
        "currency": "VUV",
        "symbol": "Vt",
        "moneyFormat": "${{amount}}",
        "decimal": 0
    },
    "WST": {
        "currency": "WST",
        "symbol": "T",
        "moneyFormat": "WS$ {{amount}}",
        "decimal": 2
    },
    "XAF": {
        "currency": "XAF",
        "symbol": "Fr",
        "moneyFormat": "FCFA{{amount}}",
        "decimal": 0
    },
    "XCD": {
        "currency": "XCD",
        "symbol": "$",
        "moneyFormat": "${{amount}}",
        "decimal": 2
    },
    "XOF": {
        "currency": "XOF",
        "symbol": "Fr",
        "moneyFormat": "CFA{{amount}}",
        "decimal": 0
    },
    "XPF": {
        "currency": "XPF",
        "symbol": "Fr",
        "moneyFormat": "{{amount_no_decimals_with_comma_separator}} XPF",
        "decimal": 0
    },
    "YER": {
        "currency": "YER",
        "symbol": "﷼",
        "moneyFormat": "﷼ {{amount}}",
        "decimal": 0
    },
    "ZAR": {
        "currency": "ZAR",
        "symbol": "R",
        "moneyFormat": "R {{amount}}",
        "decimal": 2
    },
    "ZMW": {
        "currency": "ZMW",
        "symbol": "ZK",
        "moneyFormat": "K{{amount_no_decimals_with_comma_separator}}",
        "decimal": 2
    },
    "EEK": {
        "currency": "EEK",
        "symbol": "kr",
        "moneyFormat": "kr {{amount}} EEK",
        "decimal": 2
    },
    "LVL": {
        "currency": "LVL",
        "symbol": "Ls",
        "moneyFormat": "Ls {{amount}}",
        "decimal": 2
    },
    "LTL": {
        "currency": "LTL",
        "symbol": "Lt",
        "moneyFormat": "{{amount}} Lt",
        "decimal": 2
    },
    "SKK": {
        "currency": "SKK",
        "symbol": "Sk",
        "moneyFormat": "Sk {{amount}} SKK",
        "decimal": 2
    },
    "XPT": {
        "currency": "XPT",
        "symbol": "XPT",
        "moneyFormat": "{{amount}} XPT",
        "decimal": 2
    },
    "OMR": {
        "currency": "OMR",
        "symbol": "ر.ع.",
        "moneyFormat": "{{amount_with_comma_separator}} OMR",
        "decimal": 2
    },
    "SPL": {
        "currency": "SPL",
        "symbol": "SPL",
        "moneyFormat": "{{amount}} SPL",
        "decimal": 2
    },
    "ZWD": {
        "currency": "ZWD",
        "symbol": "Z$",
        "moneyFormat": "Z$ {{amount}}",
        "decimal": 0
    },
    "ERN": {
        "currency": "ERN",
        "symbol": "ناكفا",
        "moneyFormat": "ناكفا {{amount}}",
        "decimal": 2
    },
    "CUP": {
        "currency": "CUP",
        "symbol": "₱",
        "moneyFormat": "₱ {{amount}}",
        "decimal": 0
    },
    "BTN": {
        "currency": "BTN",
        "symbol": "Nu.",
        "moneyFormat": "Nu {{amount}} BTN",
        "decimal": 0
    },
    "XAG": {
        "currency": "XAG",
        "symbol": "Nu.",
        "moneyFormat": "{{amount}} XAG",
        "decimal": 2
    },
    "MGA": {
        "currency": "MGA",
        "symbol": "Ar",
        "moneyFormat": "Ar {{amount}} MGA",
        "decimal": 0
    },
    "TVD": {
        "currency": "TVD",
        "symbol": "TV$",
        "moneyFormat": "TV$ {{amount}} TVD",
        "decimal": 2
    },
    "GGP": {
        "currency": "GGP",
        "symbol": "GGP",
        "moneyFormat": "£ {{amount}} GGP",
        "decimal": 2
    },
    "XPD": {
        "currency": "XPD",
        "symbol": "XPD",
        "moneyFormat": "{{amount}} XPD",
        "decimal": 2
    },
    "JOD": {
        "currency": "JOD",
        "symbol": "د.ا ",
        "moneyFormat": "{{amount}} JOD",
        "decimal": 2
    },
    "VEF": {
        "currency": "VEF",
        "symbol": "Bs.",
        "moneyFormat": "Bs. {{amount_with_comma_separator}}",
        "decimal": 2
    },
    "TND": {
        "currency": "TND",
        "symbol": "د.ت",
        "moneyFormat": "{{amount}} د.ت",
        "decimal": 2
    },
    "IMP": {
        "currency": "IMP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}} IMP",
        "decimal": 2
    },
    "XDR": {
        "currency": "XDR",
        "symbol": "XDR",
        "moneyFormat": "{{amount}} XDR",
        "decimal": 2
    },
    "XAU": {
        "currency": "XAU",
        "symbol": "XAU",
        "moneyFormat": "{{amount}} XAU",
        "decimal": 2
    },
    "BHD": {
        "currency": "BHD",
        "symbol": ".د.ب",
        "moneyFormat": "{{amount}} .د.ب",
        "decimal": 2
    },
    "CUC": {
        "currency": "CUC",
        "symbol": "CUC$",
        "moneyFormat": "CUC$ {{amount}}",
        "decimal": 2
    },
    "KWD": {
        "currency": "KWD",
        "symbol": "د.ك",
        "moneyFormat": "{{amount}} د.ك",
        "decimal": 2
    },
    "BYN": {
        "currency": "BYN",
        "symbol": "Br",
        "moneyFormat": "Br {{amount}}",
        "decimal": 2
    },
    "SYP": {
        "currency": "SYP",
        "symbol": "£S",
        "moneyFormat": "£S {{amount}}",
        "decimal": 0
    },
    "KPW": {
        "currency": "KPW",
        "symbol": "₩",
        "moneyFormat": "₩ {{amount}}",
        "decimal": 0
    },
    "JEP": {
        "currency": "JEP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}} JEP",
        "decimal": 2
    },
    "IRR": {
        "currency": "IRR",
        "symbol": "﷼",
        "moneyFormat": "{{amount}} ﷼",
        "decimal": 0
    },
    "LYD": {
        "currency": "LYD",
        "symbol": "ل.د",
        "moneyFormat": "LYD {{amount}} ل.د",
        "decimal": 2
    },
    "MRU": {
        "currency": "MRU",
        "symbol": "UM",
        "moneyFormat": "UM {{amount}}",
        "decimal": 0
    },
    "MRO": {
        "currency": "MRO",
        "symbol": "UM",
        "moneyFormat": "UM {{amount}}",
        "decimal": 0
    },
    "SDG": {
        "currency": "SDG",
        "symbol": "£SD",
        "moneyFormat": "£SD {{amount}}",
        "decimal": 0
    },
    "TMT": {
        "currency": "TMT",
        "symbol": "T",
        "moneyFormat": "T {{amount}} TMT",
        "decimal": 2
    },
    "IQD": {
        "currency": "IQD",
        "symbol": "T",
        "moneyFormat": "{{amount}} ع.د",
        "decimal": 0
    },
    "SOS": {
        "currency": "SOS",
        "symbol": "Sh.so.",
        "moneyFormat": "Sh.so.{{amount}}",
        "decimal": 0
    },
    "SVC": {
        "currency": "SVC",
        "symbol": "SVC",
        "moneyFormat": "{{amount}} SVC",
        "decimal": 2
    },
    "GHS": {
        "currency": "GHS",
        "symbol": "GH₵",
        "moneyFormat": "GH₵ {{amount}}",
        "decimal": 2
    },
    "CYP": {
        "currency": "CYP",
        "symbol": "£",
        "moneyFormat": "£ {{amount}} CYP",
        "decimal": 2
    },
    "MTL": {
        "currency": "MTL",
        "symbol": "Lm",
        "moneyFormat": "Lm {{amount}} MTL",
        "decimal": 2
    },
    "SIT": {
        "currency": "SIT",
        "symbol": "SIT",
        "moneyFormat": "{{amount}} SIT",
        "decimal": 2
    },
    "VEB": {
        "currency": "VEB",
        "symbol": "Bs",
        "moneyFormat": "Bs {{amount}} VEB",
        "decimal": 0
    },
    "BYR": {
        "currency": "BYR",
        "symbol": "BYR",
        "moneyFormat": "{{amount}} BYR",
        "decimal": 0
    },
    "TMM": {
        "currency": "TMM",
        "symbol": "TMM",
        "moneyFormat": "{{amount}} TMM",
        "decimal": 0
    },
    "ZMK": {
        "currency": "ZMK",
        "symbol": "ZMK",
        "moneyFormat": "{{amount}} ZMK",
        "decimal": 0
    },
    "XBT": {
        "currency": "XBT",
        "symbol": "XBT",
        "moneyFormat": "{{amount}} XBT",
        "decimal": 2
    },
    "NTD": {
        "currency": "NTD",
        "symbol": "NTD",
        "moneyFormat": "{{amount}} NTD",
        "decimal": 0
    },
    "CNH": {
        "currency": "CNH",
        "symbol": "CNH",
        "moneyFormat": "{{amount}} CNH",
        "decimal": 2
    },
    "STN": {
        "currency": "STN",
        "symbol": "STN",
        "moneyFormat": "{{amount}} STN",
        "decimal": 2
    },
    "VES": {
        "currency": "VES",
        "symbol": "VES",
        "moneyFormat": "{{amount}} VES",
        "decimal": 0
    },
    "MXV": {
        "currency": "MXV",
        "symbol": "MXV",
        "moneyFormat": "{{amount}} MXV",
        "decimal": 2
    }
};
var dynamicDataFlag = false;
var pricePerDeliveryClass = '';

function appendMainDiv() {
    try {
        var productForm;
        if (ws_window_width < 600) {
            productForm = document.querySelector(ws_selectors.productMobSelector.selector);
            if (ws_selectors.productMobSelector.addOn === "after") {
                productForm.parentNode.insertBefore(divEle, productForm.nextSibling);
            } else if (ws_selectors.productMobSelector.addOn === "before") {
                productForm.parentNode.insertBefore(divEle, productForm);
            } else if (ws_selectors.productMobSelector.addOn === "first child") {
                productForm.insertBefore(divEle, productForm.firstChild);
            } else {
                productForm.insertBefore(divEle, productForm.lastChild);
            }

        } else {
            productForm = document.querySelector(ws_selectors.productWebSelector.selector);
            if (ws_selectors.productWebSelector.addOn === "after") {
                productForm.parentNode.insertBefore(divEle, productForm.nextSibling);
            } else if (ws_selectors.productWebSelector.addOn === "before") {
                productForm.parentNode.insertBefore(divEle, productForm);
            } else if (ws_selectors.productWebSelector.addOn === "first child") {
                productForm.insertBefore(divEle, productForm.firstChild);
            } else {
                productForm.insertBefore(divEle, productForm.lastChild);
            }
        }
    } catch (error) {
        throw error;
    }
}
async function httpGetAsync(theUrl, reqType, body, callback) {
    try {
        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open(reqType, theUrl, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.onreadystatechange = function () {
                try {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        if (callback) {
                            resolve(callback(JSON.parse(xmlHttp.responseText)));
                        } else {
                            resolve(JSON.parse(xmlHttp.responseText));
                            // return JSON.parse(xmlHttp.responseText);
                        }
                    } else if (xmlHttp.status != 200) {
                        // makeDefaultVisible();
                        reject({
                            status: xmlHttp.status,
                            statusText: xmlHttp.statusText
                        });
                    }
                } catch (error) {
                    console.log("Error:httpGetAsync-", error);
                    // makeDefaultVisible();
                }
            };
            xmlHttp.send(JSON.stringify(body));
        });
    } catch (error) {
        throw error;
    }
}
function manageThankyouPage() {
    try {
        var thankyouPage = document.querySelectorAll('[data-step="thank_you"] .step__sections .content-box')[0];

        if (thankyouPage) {
            let email = Shopify.checkout.email;
            let shopApi = Shopify.Checkout.apiHost;
            var thankyouDivEle = document.createElement("div");
            thankyouDivEle.classList.add('content-box');
            thankyouDivEle.innerHTML = '<div class="content-box__row content-box__row--no-border">'
                + '<h2>Subcription</h2>'
                + '</div>'
                + '<div class="content-box__row">'
                + '<h3 class="heading-3">Click on button to view and manage your subcription</h3>'
                + '</div>'
                + '<div class="content-box__row"style="border: none; padding-top: 0;">'
                + '<a href="http://' + shopApi + '/apps/manage-subscription?email=' + email + '" class="btn" target="_blank">'
                + '<span>Manage Your Subcription</span>'
                + '</a>'
                + '</div>';
            thankyouPage.parentNode.insertBefore(thankyouDivEle, thankyouPage.nextSibling);
        }
    } catch (error) {
        throw error;
    }
}
function manageAccountPage() {
    try {
        let accountPage;
        if (ws_window_width < 600) {
            accountPage = document.querySelector(ws_selectors.accountMobSelector.selector);
        } else {
            accountPage = document.querySelector(ws_selectors.accountWebSelector.selector);
        }

        if (accountPage && WSConfig) {
            var accountDivEle = document.createElement("div");
            accountDivEle.innerHTML = '<a href="http://' + WSConfig.shop + '/apps/manage-subscription?email=' + WSConfig.customerEmail + '" class="btn" target="_blank">'
                + '<span>Manage Your Subcription</span>'
                + '</a>';

            if (ws_window_width < 600) {
                if (ws_selectors.accountMobSelector.addOn === "after") {
                    accountPage.parentNode.insertBefore(accountDivEle, accountPage.nextSibling);
                } else if (ws_selectors.accountMobSelector.addOn === "before") {
                    accountPage.insertBefore(accountDivEle, accountPage);
                } else if (ws_selectors.accountMobSelector.addOn === "first child") {
                    accountPage.insertBefore(accountDivEle, accountPage.firstChild);
                } else {
                    //last child
                    accountPage.insertBefore(accountDivEle, accountPage.lastChild);
                }
            } else {
                if (ws_selectors.accountWebSelector.addOn === "after") {
                    accountPage.parentNode.insertBefore(accountDivEle, accountPage.nextSibling);
                } else if (ws_selectors.accountWebSelector.addOn === "before") {
                    accountPage.insertBefore(accountDivEle, accountPage);
                } else if (ws_selectors.accountWebSelector.addOn === "first child") {
                    accountPage.insertBefore(accountDivEle, accountPage.firstChild);
                } else {
                    //last child
                    accountPage.insertBefore(accountDivEle, accountPage.lastChild);
                }
            }

            // accountPage.appendChild(accountDivEle);
        }
    } catch (error) {
        throw error;
    }
}
function setLayoutData(res) {
    try {
        if (res.length) {
            if (res[0].data) {
                if (res[0].data.selectors) ws_selectors = res[0].data.selectors;
                if (res[0].data.language) ws_lang = res[0].data.language;
                if (res[0].data.style && res[0].data.style.brandColor) setBrandColor(res[0].data.style.brandColor);
                if (res[0].data.style && res[0].data.style.subscriptionLayout) ws_css = res[0].data.style.subscriptionLayout;

                pricePerDeliveryClass = ws_css.showPricePerDelivery === true ? 'active' : '';
            }
        }
        initCall();
    } catch (error) {
        throw error
    }
}
function setBrandColor(color) {
    let controls = ["primaryFontColor", "secondaryFontColor", "wBorderColor", "spBorderColor", "sBorderColor", "dFontColor", "fFontColor", "tTitleFontColor", "tFontColor", "tSubTitleFontColor", "tBodyFontColor", "rdBorderColor", "rdBgColor"];
    for (let i = 0; i < controls.length; i++) {
        ws_css[controls[i]] = color;
    }
}
(async function () {
    try {
        let promise = [
            httpGetAsync(
                wsApiUrl + "/subscriptionFront?shopUrl=" + wscc_shop,
                "GET",
                null
            )
        ];
        await Promise.all(promise).then(async (res) => {
            setLayoutData(res);
        }).catch(function (err) {
            throw err;
        });
    } catch (error) {
        console.log("Error:SelfInvoking-", error);
    }
})();
function subscriptionCss(data) {
    let secFont = data.secondaryFontSize - 1;
    return '<style id="subscriptionCss">'
        + '.sro_plan_content_title{color :' + data.primaryFontColor + '}'
        + '.selling_plan_name{color :' + data.primaryFontColor + '}'
        + '.selling_plan_name p{font-size : ' + data.secondaryFontSize + 'px;color :' + data.secondaryFontColor + ';}'
        + '.selling_plan_option .selling_plan_name,.selling_plan_option .selling_plan_name span{font-size : ' + data.secondaryFontSize + 'px;color :' + data.secondaryFontColor + '; vertical-align: unset;}'
        + '.selling_plan_option .selling_plan_name p{font-size : ' + secFont + 'px;}'
        + '.selling_plans_item.active{background: ' + data.listBackgroundColor + '}'
        + '.selling_select{font-size : ' + data.secondaryFontSize + 'px;color :' + data.secondaryFontColor + '; }'
        + '</style>';
}
function addCssToHead(style, id) {
    let avail = document.getElementById(id);
    if (avail) avail.remove();
    document.head.insertAdjacentHTML("beforeend", style);
}
function getDefualtPropertyValue(property) {
    switch (property) {
        case 'border-width':
            return "1px";
        case 'border-radius':
            return "1px";
        case 'border-color':
            return '#ccc';
        case 'background':
            return '#fff';
        case 'border-style':
            return 'solid';
        case 'padding':
            return '10px';
        default:
            break;
    }
}
function bindCss(element, properties) {
    if (element) {
        properties.forEach(property => {
            element.style[property.name] = property.value ? property.value : getDefualtPropertyValue(property.name);
        });
    }
}
function createDropdown(name, id) {
    let wsDropdown = document.createElement("div");
    wsDropdown.classList.add("ws-dropdown");
    if (name.length > 0) wsDropdown.setAttribute("name", 'selling_plan');
    wsDropdown.setAttribute("id", 'ws_dropdown_' + id);
    if (testEnv) wsDropdown.classList.add("active");
    return wsDropdown;
}

function changeSelectedDropItem(name, discount) {
    let selectedDropItem = document.querySelector(".ws-dropdown-item.selected .ws-dropdown-item-text");
    if (selectedDropItem) {
        let str = name + ` ` + discount;
        selectedDropItem.setAttribute("title", str);
        selectedDropItem.innerHTML = str;
    }
}
window.wsDropItemSelect = (event, id, groupId) => {
    let name = event.getAttribute("data-name");
    let discount = event.getAttribute("data-discount");
    handleSelectChange(groupId, id, false, false);
    changeSelectedDropItem(name, discount);
    window.changeDropdownStatus(groupId);
}

function createDropdownItem(groupId, name, discount, selected, id) {
    let wsDropdownItem = document.createElement("div");
    wsDropdownItem.classList.add("ws-dropdown-item");
    let str = name + ` ` + discount;
    wsDropdownItem.innerHTML = `<div class="ws-dropdown-item-text" title="` + str + `">` + str + `</div>`;
    if (!selected) {

        wsDropdownItem.setAttribute("data-group-id", groupId);
        wsDropdownItem.setAttribute("data-name", name);
        wsDropdownItem.setAttribute("data-discount", discount);
        wsDropdownItem.setAttribute("data-selected", selected);
        wsDropdownItem.setAttribute("data-selected", selected);
        wsDropdownItem.setAttribute("data-id", groupId);
        wsDropdownItem.setAttribute("onclick", "window.wsDropItemSelect(this,'" + id + "','" + groupId + "')");
    } else {
        wsDropdownItem.classList.add("selected");
        wsDropdownItem.setAttribute("onclick", "window.changeDropdownStatus('" + groupId + "')");
        wsDropdownItem.innerHTML += `
            <div class="ws-dropdown-arrow">
                <div class="ws-arrow ws-up-arrow">
                    <svg _ngcontent-dbl-c5="" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 330 330;" version="1.1" viewBox="0 0 330 330" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px"><path _ngcontent-dbl-c5="" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" id="XMLID_225_"></path></svg>
                </div>
                <div class="ws-arrow ws-down-arrow">
                    <svg _ngcontent-dbl-c5="" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 330 330;" version="1.1" viewBox="0 0 330 330" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px"><path _ngcontent-dbl-c5="" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" id="XMLID_225_"></path></svg>
                </div>
            </div>
        `;
    }
    // wsDropdownItem.innerHTML = `<span>` + name + `</span><span>` + discount + `</span>`
    return wsDropdownItem;
}

function selectOptionList(sellingGroup, defaultSelect, type) {
    let sellingPlans = sellingGroup.selling_plans
    let planOption = "";
    // let dropDonwItemOption = "";
    let sellingPlanName = defaultSelect == 'active' ? 'name="selling_plan"' : '';
    let sText = ws_css.sText ? ws_css.sText : 'Save';
    sText = ws_css.sTextVisible ? sText + ' ' : '';

    if (ws_css.showDropDown) {
        let wsDropdown = createDropdown(sellingPlanName, sellingGroup.id);
        let wsDropdownList = document.createElement("div");
        let sAnimationSpeed = ws_css.sAnimationSpeed ? ws_css.sAnimationSpeed : "faster";
        wsDropdownList.classList.add("ws-dropdown-list");
        // wsDropdownList.classList.add("animate__animated");
        // wsDropdownList.classList.add("animate__" + sAnimationSpeed);

        for (let i = 0; i < sellingPlans.length; i++) {
            let sellingDiscount = ''
            if (sellingPlans[i].price_adjustments.length > 0 && sellingPlans[i].price_adjustments[0].value) {
                sellingDiscount = '(' + sText + sellingPlans[i].price_adjustments[0].value
                if (sellingPlans[i].price_adjustments[0].value_type == 'percentage') {
                    sellingDiscount += '%)'
                } else if (sellingPlans[i].price_adjustments[0].value_type == 'price') {
                    sellingDiscount = '(' + shopifyFormatMoney(sellingPlans[i].price_adjustments[0].value, WSConfig.moneyFormat) + ')'
                } else {
                    sellingDiscount = '(' + sText + shopifyFormatMoney(sellingPlans[i].price_adjustments[0].value, WSConfig.moneyFormat) + ') '
                }
            }
            planOption += '<option value="' + sellingPlans[i].id + '">' + sellingPlans[i].name + ' ' + sellingDiscount + '</option>';
            // dropDonwItemOption += '<div onclick="changeDropdownStatus(`' + sellingGroup.id + '`)">' + + ' ' + sellingDiscount + '</div>';
            if (i == 0) {
                wsDropdown.appendChild(createDropdownItem(sellingGroup.id, sellingPlans[i].name, sellingDiscount, true, sellingPlans[i].id));
            }
            wsDropdownList.appendChild(createDropdownItem(sellingGroup.id, sellingPlans[i].name, sellingDiscount, false, sellingPlans[i].id));
        }

        wsDropdown.appendChild(wsDropdownList);

        // return '<select class="selling_select" ' + sellingPlanName + ' id="selling_select_' + sellingGroup.id + '" onchange="handleSelectChange(`' + sellingGroup.id + ',false,false,false`)">'
        return '<select class="selling_select" ' + sellingPlanName + ' id="selling_select_' + sellingGroup.id + '">'
            + planOption
            + '</select>'
            + wsDropdown.outerHTML;

    } else {
        for (let i = 0; i < sellingPlans.length; i++) {
            let sellingDiscount = ''
            let checkedInput = defaultSelect == 'active' && i == 0 ? 'checked' : ''
            if (sellingPlans[i].price_adjustments.length > 0 && sellingPlans[i].price_adjustments[0].value) {
                sellingDiscount = '(' + sText + sellingPlans[i].price_adjustments[0].value
                if (sellingPlans[i].price_adjustments[0].value_type == 'percentage') {
                    sellingDiscount += '%)'
                } else if (sellingPlans[i].price_adjustments[0].value_type == 'price') {
                    sellingDiscount = '(' + shopifyFormatMoney(sellingPlans[i].price_adjustments[0].value, WSConfig.moneyFormat) + ')'
                } else {
                    sellingDiscount = '(' + sText + shopifyFormatMoney(sellingPlans[i].price_adjustments[0].value, WSConfig.moneyFormat) + ') '
                }
            }

            let savePrice = ws_css.showPricePerDelivery === true ? '<p class="ws_delivery_price  " id="savePrice_' + sellingPlans[i].id + '"></p>' : '';
            planOption += '<div class="selling_plan_option">'
                + '<input type="radio" value="' + sellingPlans[i].id + '" class="selling_select" name="selling_plan" onchange="window.handlePlanChange(`' + sellingPlans[i].id + '`)" ' + checkedInput + '>'
                + '<div class="selling_plan_name">' + sellingPlans[i].name + ' ' + sellingDiscount + savePrice + '</div>'
                + '</div>'
        }

        return planOption;
    }
}

function getPlanBody(plan, data) {
    let planBodyHtml = "";
    let fTitle = ws_css.fTitle ? ws_css.fTitle : "Delivery frequency";
    if (ws_css.showDropDown) {
        planBodyHtml = `
            <div class="selling_plan_input">
                <input type="radio" name="purchase_option" id="radio_` + plan.id + `" onchange="window.handleChange('` + plan.id + `')"  ` + data.checkedInput + ` >
                <div class="selling_plan_name"> 
                    <label class="selling_plan_label" for="radio_` + plan.id + `"><span>` + plan.name + `</span></label>
                    <p class="ws_delivery_price" id="savePrice_` + plan.id + `"> <span>Save {{discount}}</span> <span>Each</span></p>
                </div>
            </div>
            <div class="selling_plan_select `+ data.activeClass + `" id=` + plan.id + `>
                <label class="frequency-title">` + fTitle + `</label>`
            + selectOptionList(plan, data['activeClass'], 'select') + `
			</div>`;
    } else {
        planBodyHtml = `
        <fieldset class="selling_plan_input">
            <input type="radio" name="purchase_option" id="radio_` + plan.id + `" onchange="window.handleChange('` + plan.id + `')"` + data['checkedInput'] + `>
            <div class="selling_plan_name"> 
                <label class="selling_plan_label" for="radio_` + plan.id + `"><span>` + plan.name + `</span></label>` + data['savePrice'] + `
            </div>
        </fieldset>
        <div class="selling_plan_select ` + data['selectActive'] + `" id=` + data['selectID'] + `>
            <label class="frequency-title">` + fTitle + `</label>`
            + selectOptionList(plan, data['activeClass'], 'select') + `
			</div>`;
    }
    return planBodyHtml;
}
function getPlan(plan, i) {
    let planElement = document.createElement("fieldset");
    planElement.classList.add("selling_plans_item");
    let data = {};
    data['checkedInput'] = WSConfig.product.requires_selling_plan && i == 0 ? 'checked' : '';
    data['activeClass'] = WSConfig.product.requires_selling_plan && i == 0 ? 'active' : '';
    data['planItemID'] = plan.id ? plan.id : '';
    data['selectID'] = !ws_css.showDropDown ? plan.id : '';
    data['savePrice'] = !ws_css.showDropDown ? '<p class="ws_delivery_price " id="savePrice_' + plan.id + '"></p>' : '';
    data['selectActive'] = WSConfig.product.requires_selling_plan && i == 0 && !ws_css.showDropDown ? 'active' : '';
    data['testClass'] = plan.app_id == 'WS-Test' ? 'test-plan' : '';
    if (data['testClass'] && data['testClass'] != '') planElement.classList.add(data['testClass']);
    if (data['activeClass'] && data['activeClass'] != '') planElement.classList.add(data['activeClass']);
    if (data['planItemID'] && data['planItemID'] != '') planElement.setAttribute("id", "parent_" + data['planItemID']);
    if (wstestEnv) {
        planElement.innerHTML += getPlanBody(plan, data);
        return planElement;
    } else if (!wstestEnv && plan.app_id != 'WS-Test') {
        planElement.innerHTML += getPlanBody(plan, data);
        return planElement;
    } else {
        let emptySpan = document.createElement("span");
        emptySpan.classList.add("empty-span");
        return emptySpan;
    }
}
function getPlanGroupsElement() {
    let planGroupsElement = document.createElement("fieldset");
    planGroupsElement.classList.add("selling_plans");
    for (let i = 0; i < sellingGroups.length; i++) {
        planGroupsElement.appendChild(getPlan(sellingGroups[i], i));
    };
    return planGroupsElement;
}
function getSellingPlansElement() {
    let isOneTime = WSConfig.product.requires_selling_plan ? 'hide' : 'show';
    let sellingPlansElement = document.createElement("fieldset");
    sellingPlansElement.classList.add("selling_plans");
    sellingPlansElement.innerHTML = `
    <fieldset class="selling_plans_item first active ` + isOneTime + `" id="parent_One_time">
        <div class="selling_plan_input">
            <input type="radio" name="purchase_option" id="One_time" onchange="handleChange('One_time')" checked>
            <div class="selling_plan_name ws-one-time-selling-plan"><label class="selling_plan_label" for="One_time"><span>` + WSConfig.oneTimePurchaseText + `</span></label></div>
        </div>
    </fieldset>`;

    // sellingPlansElement.appendChild(getPlanGroupsElement());
    for (let i = 0; i < sellingGroups.length; i++) {
        sellingPlansElement.appendChild(getPlan(sellingGroups[i], i));
    };

    return sellingPlansElement;
}
function getTooltipElement() {
    let tooltip = document.createElement("div");
    tooltip.classList.add("ws-tooltip-content");
    tooltip.setAttribute("id", "wsTooltopContent");
    let bodyTitleClass = !ws_css.showTooltipOnHover ? ' active' : '';
    let mainTitleClass = ws_css.showTooltipOnHover ? 'active' : '';
    let onHoverClass = ws_css.showTooltipOnHover ? 'on-hover' : '';
    let tText = ws_css.tText ? ws_css.tText : "You will have complete control over orders you can pause, skip, cancel orders anytime as per your requirements.";
    let tooltipTitle = document.createElement("div");
    tooltipTitle.classList.add("ws-tooltip-title");
    if (mainTitleClass != "") tooltipTitle.classList.add(mainTitleClass);
    let wsTooltipSampleButton = ws_css.showTooltipSampleButton ? `<a target="_blank" href="https://` + WSConfig.shop + `/apps/manage-subscription?source=webrex&cid=1724317865">Sample Subscription Contract</a>` : '';
    tooltipTitle.innerHTML = `
    <div class="ws-title-holder">
        <div class="ws-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M 15 3 C 8.3845336 3 3 8.3845336 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.463391 27 26.739934 21.859094 26.978516 15.451172 A 1.0001 1.0001 0 1 0 24.980469 15.376953 C 24.78105 20.733032 20.406609 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 9.4654664 9.4654664 5 15 5 C 18.223885 5 21.071781 6.5288542 22.898438 8.890625 L 21 10.476562 L 25.978516 11.712891 L 26 6.3027344 L 24.435547 7.6074219 C 22.239252 4.8060304 18.829459 3 15 3 z M 13.787109 9 L 13.988281 17 L 16.011719 17 L 16.212891 9 L 13.787109 9 z M 15.003906 18.810547 C 14.174906 18.810547 13.679688 19.252813 13.679688 20.007812 C 13.679688 20.748813 14.175906 21.189453 15.003906 21.189453 C 15.825906 21.189453 16.318359 20.748812 16.318359 20.007812 C 16.318359 19.252813 15.825906 18.810547 15.003906 18.810547 z"></path></svg>
        </div>
        <span>` + ws_css.tTitle + `</span>
    </div>
    `+ wsTooltipSampleButton;

    let tooltipBody = document.createElement("div");
    tooltipBody.classList.add("ws-tooltip-body");
    tooltipBody.innerHTML = ` <div class="ws-tooltip-title` + bodyTitleClass + ` ">
		<span class="ws-title-in-body">`+ ws_css.tTitle + `</span>
		`+ wsTooltipSampleButton + `
    </div>
    <div class="static-message">
        <span class="static-message-text">
            `+ tText + `
        </span>
    </div>
    <div class="dynamic-message" id="dynamicMessage"> </div>
    `;

    let tooltipMain = document.createElement("div");
    tooltipMain.classList.add("ws-tooltip");
    if (onHoverClass != "") tooltipMain.classList.add(onHoverClass);

    tooltipMain.appendChild(tooltipTitle);
    tooltipMain.appendChild(tooltipBody);

    tooltip.appendChild(tooltipMain);
    if (onHoverClass != "") {
        let ws_t_title_holder, ws_t_title_parent, ws_t_hover_parent, ws_t_body;
        ws_t_title_holder = tooltip.querySelector('.ws-title-holder');
        if (ws_t_title_holder) {
            ws_t_title_parent = ws_t_title_holder.parentElement;
            if (ws_t_title_parent) {
                ws_t_hover_parent = ws_t_title_parent.parentElement;
                if (ws_t_hover_parent) {
                    ws_t_body = ws_t_hover_parent.querySelector(".ws-tooltip-body");
                }
            }
            if (ws_t_body) {
                ws_t_title_holder.addEventListener("mouseover", function (event) {
                    ws_t_body.classList.add("active");
                }, false);
                ws_t_title_holder.addEventListener("mouseout", function (event) {
                    ws_t_body.classList.remove("active");
                }, false);
            }
        }

    }
    return tooltip;
}
function getPlanContent() {
    let planContent = document.createElement("fieldset");
    planContent.classList.add("sro_plan_content");
    planContent.innerHTML = `
	<div class="sro_plan_content_title">
		<legend>` + WSConfig.purchaseOptionsText + `</legend>
	</div>`;
    planContent.appendChild(getSellingPlansElement());

    // let wsWidgetTitle = planContent.querySelector(".sro_plan_content_title");
    // bindCss(wsWidgetTitle, [{ name: "paddingBottom", value: ws_css["wTitlePaddingBottom"] + "px" }]);

    return planContent;
}
function initCall() {
    if (ws_lang && WSConfig) {
        WSConfig.purchaseOptionsText = ws_css.wTitleText ? ws_css.wTitleText : "Purchase Options";
        WSConfig.oneTimePurchaseText = ws_css.wOneTimeText ? ws_css.wOneTimeText : "One Time Purchase";
    }
    manageThankyouPage();
    manageAccountPage();
    sellingGroups = [];
    if (WSConfig && WSConfig.product && WSConfig.selling_plan_groups && WSConfig.selling_plan_groups.length > 0) {
        sellingGroups = WSConfig.selling_plan_groups.filter((sellingGroup) => {
            return (sellingGroup.app_id === "WS-Subscription" || sellingGroup.app_id === "WS-Test");
        });
        sellingGroupsCount = WSConfig.selling_plan_groups.filter((sellingGroup) => { return sellingGroup.app_id === "WS-Subscription"; }).length;
    }
    if (WSConfig && WSConfig.product && sellingGroups.length > 0) {
        currentVariant = WSConfig.selected_or_first_available_variant;
        plansGroups = "";
        selectionOption = '';
        divEle = document.createElement("div");
        //bind css to main div
        // bindCss(divEle, [{ name: "border-color", value: ws_css["wBorderColor"] }, { name: "border-width", value: ws_css["wBorderWidth"] + "px" }, { name: "border-style", value: ws_css["wBorderStyle"] }, { name: "border-radius", value: ws_css["wBorderRadius"] + "px" }, { name: "paddingTop", value: ws_css["wPaddingTop"] + "px" }, { name: "paddingRight", value: ws_css["wPaddingRight"] + "px" }, { name: "paddingBottom", value: ws_css["wPaddingBottom"] + "px" }, { name: "paddingLeft", value: ws_css["wPaddingLeft"] + "px" }]);
        // divEle.classList.add(WSConfig.templateType);
        divEle.style.marginBottom = "10px";
        selectedVariantId = currentVariant.id
        temp1SelectedGroup = null
        divEle.appendChild(getPlanContent());
        if (ws_css.showTooltip) {
            divEle.appendChild(getTooltipElement());
        }
        if (wstestEnv || (!wstestEnv && sellingGroupsCount > 0)) {
            appendMainDiv();
        }
        var product = document.getElementById(product);
        // Shopify.money_format = "${{amount}}";
     
        if (document.readyState !== 'loading') {
          
            if (ws_css.defaultSelected) {
             setTimeout(() => {
                let plan = getFirstAvailableSellingPlan();
                if (plan)
                    handleChange(getFirstAvailableSellingPlan());
            }, 1000);
            } else {
                setPrice();
            }
        } else {
            document.addEventListener('DOMContentLoaded', function () {

                if (ws_css.defaultSelected) {
                    setTimeout(() => {
                let plan = getFirstAvailableSellingPlan();
                if (plan)
                    handleChange(getFirstAvailableSellingPlan());
            }, 1000);
                } else {
                    setPrice();
                }
            });
        }
        handleStyles();
    }
}
function getFirstAvailableSellingPlan() {
    let findPlanId;
    let selected = false;
    let sellingGroups = WSConfig.selling_plan_groups.filter((sellingGroup) => {
        return (sellingGroup.app_id === "WS-Subscription" || sellingGroup.app_id === "WS-Test");
    });
    if (WSConfig.selected_or_first_available_variant.selling_plan_allocations && sellingGroups) {
        WSConfig.selected_or_first_available_variant.selling_plan_allocations.forEach(allocation => {
            let findPlan = sellingGroups.find(e => e.id == allocation.selling_plan_group_id);
            if (findPlan) {
                if (!selected) {
                    console.log(findPlan);
                    findPlanId = findPlan.id;
                    selected = true;
                }
            }
        });
    }
    return findPlanId;
}
function handleStyles() {

    if (ws_css) addCssToHead(subscriptionCss(ws_css), "subscriptionCss");

    let commonCss = `
    .test-plan .selling_plan_label:after {
        content: "test plan";
        /* font-family: monospace; */
        background: #4caf50;
        padding: 2px 8px;
        font-size: 14px;
        margin-left: 5px;
        border-radius: 3px;
        text-transform: capitalize;
        letter-spacing: 0.5px;
        color: #fff;
        font-weight: bold;
        box-shadow: -2px 0px 5px -1px #b9b8b8;
        display: inline-block;
    }
    label.selling_plan_label {
        cursor: pointer;
    }
    .ws-dropdown-list {
        animation: growDown 300ms ease-in-out forwards;
        transform-origin: top center;
    }
	// .ws-dropdown.active .ws-dropdown-list {
	//     animation: growUp 300ms ease-in-out forwards;
	//     transform-origin: top center;
	// }
    @-moz-keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }
    @-webkit-keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }
    @-o-keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }
    @keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }
	@-moz-keyframes growUp {
        0% {
            transform: scaleY(1);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(0);
        }
    }
    @-webkit-keyframes growUp {
        0% {
            transform: scaleY(1);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(0);
        }
    }
    @-o-keyframes growUp {
        0% {
            transform: scaleY(1);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(0);
        }
    }
    @keyframes growUp {
        0% {
            transform: scaleY(1);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(0);
        }
    }
          
    selling_plans_item.active .selling_plan_select {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .selling_plan_select{
        display:none;   
        flex-direction:column;
        align-items: flex-start;
    }
    
    .selling_plan_select.active{
        display:flex;
    }
    .ws_delivery_price{
        display:none;
      
    }
	// .selling_plans_item.active{
	// 	border-radius:10px;
	// }
    .selling_plans_item.active .ws_delivery_price.active{
        display:flex;
        flex-wrap:wrap;
    }
    .selling_plans_item.active .selling_plan_select{
        display:flex;
    }
    fieldset {
        border: none;
        margin: 0px;
        padding: 0px;
        line-height: initial;
    }
    .ws_delivery_price>span {
        display: flex;
        align-items: center;
    }
    .empty-span{
        display:none !important;
    }
    .sro_plan_content :focus-visible {
        outline: unset;
        outline-offset: unset;
        box-shadow: unset;
    }
    .sro_plan_content legend{
        float: initial;
        margin: initial;
        line-height: initial;
    }
    .ws-tooltip{
        position:relative;
    }
    .ws-tooltip .ws-tooltip-body{
        border-radius: 8px;
        margin-top: 10px;
    }
    .dynamic-message{
        display: flex;
        flex-direction: column;
    }
    .dynamic-message span{
        margin: 5px 0px;
        font-size: 14px;
        font-weight: 100;
        letter-spacing: 1px;
    }
    .ws-tooltip-content{
        margin-top:10px;
    }
    .ws-tooltip-title{
        display:none;
        align-items: center;
        justify-content: flex-start;
        flex-wrap:wrap;
    }
    .ws-tooltip-title a{
        margin: 5px 0px;
        background: #f8f8f8;
        padding: 2px 10px;
        border-radius: 5px;
        color: #000;
        font-size: 12px;
        opacity: 0.6;
    }
    .ws-tooltip-title.active{
        display:flex;
    }
    .ws-tooltip-title .ws-icon{
        margin-right:10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ws-title-holder{
        display: flex;
        align-items: center;
        margin-right:10px;
    }
    .ws-title-in-body{
        margin-right:10px;
    }
    .ws-tooltip-title .ws-icon svg{
        // margin: 0px -1px -2px 0px;
        margin:0px;
    }
    .ws-tooltip.on-hover .ws-tooltip-title{
        cursor:pointer;
    }
    .ws-tooltip.on-hover .ws-tooltip-body{
        display:none;
        position: absolute;
        top: 30px;
        margin: 0px;
        left: 0px;
        box-shadow: 0px 0px 15px 5px #e2e2e2;
        z-index: 1;
    }
    .ws-tooltip.on-hover .ws-tooltip-body.active{
        display:block;
    }
    // .ws-tooltip.on-hover .ws-tooltip-title:hover+.ws-tooltip-body{
    //     display:block;
    // }
    .ws-tooltip.on-hover .ws-tooltip-body:after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #f8f8f8 transparent;
        position: absolute;
        top: -10px;
        left: 15px;
        z-index: 1;
    }
    .ws-tooltip .ws-tooltip-title span{
        line-height:1;
    }
    `;

    let oldCommonCss = `.sro_plan_content {
        padding: 5px;
        padding: 0px;
        position:relative;
        z-index:2;
        }
        
        .sro_plan_content_title {
        // padding: 0 5px;
        background: none;
        //margin-top: -15px;
        width: fit-content;
        // margin-left: 20px;
        font-size: 18px;
        font-weight: 600;
        }
        
        .sro_plan_content .sro_plans {
        padding: 10px;
        margin: 0px;
        }
        
        .sro_plan_content .sro_plans .plan {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        }
        
        .sro_plan_content .sro_plans .plan input {
        margin-right: 5px;
        }
        
        .selected_selling_plan {
        margin-top: -1px;
        padding: 10px 20px;
        margin-bottom: 0px;
        }
        
        .selected_selling_plan {
        margin-top: -1px;
        padding: 10px 20px;
        margin-bottom: 0px;
        }
        
        .selling_plan_option {
        display: flex;
        align-items: center;
        padding: 4px 10px;
        }
        
        .selling_plan_option .title {
        color: #666666;
        font-weight: 500;
        font-size: 16px;
        margin-left: 22px
        }
        
        .selling_plan_option .plan {
        display: flex;
        align-items: center;
        }
        
        .selling_plan_option .plan span {
        margin-left: 10px;
        font-size: 16px;
        }
        
        .selling_plan_option input {
        min-height: unset
        }
        
        .selling_plan_option .selling_plan_name {
        margin-left: 10px;
        display:inline;
        }
        
        .selling_plans {
        padding: 0;
        border-color: #494949;
        // overflow:hidden;
        }
        
        .selling_plans_item .selling_plan_input {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 16px;
        // align-items: flex-start;
        }
        
        .selling_plan_name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-wrap:wrap;
        }
        
        .selling_plan_name p {
        font-size: 14px;
        text-align: right;
        opacity: 0.8;
        font-weight: 600;
        margin:0px;
        }
        
        .selling_plan_name p span {
            font-size: 12px;
            color: #999;
            font-weight: 400;
        }
        
        .selling_plans_item .selling_plan_input input {
        min-height: unset;
        margin-right: 10px;
        }
        
        .selling_plans_item .selling_plan_select select {
            width:100%;
        }
        
        .selling_plans_item.show {
        display: block;
        }
        
        .selling_plans_item.hide {
        display: none;
        }
        
        .selling_plan_select {
        display: none;
        }
        
        .sro_plan_content_title {
        font-weight: 600;
        }
        .selling_select{
            height:initial;
            text-transform: capitalize;
            display:none;
        }
        .ws-dropdown{
            height: initial;
            text-transform: capitalize;
            position: relative;
            width: 100%;
        }
        .ws-dropdown.active .ws-dropdown-list{
            display:block;
        }
        .ws-dropdown-list{
            width: max-content;
            position: absolute;
            z-index: 1;
            left: 0;
            top: 100%;
            width:100%;
            // transform: translateY(calc(100% + 10px));
            display:none;
        }
        .ws-dropdown-item{
            cursor:pointer;
        }
        .ws-dropdown-item-text{
            overflow: hidden;
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
		.ws-arrow{
            height: 16px;
            width: 16px;
            transition:all 0.3s;
        }
        
        .ws-arrow.ws-up-arrow {
            transform: translateY(-100%) rotate(180deg);
        }
        .ws-dropdown.active .ws-arrow.ws-up-arrow {
            transform: translateY(0%) rotate(180deg);
        }
        .ws-arrow.ws-down-arrow {
            transform: translateY(-100%);
        }
        .ws-dropdown.active .ws-arrow.ws-down-arrow {
            transform: translateY(0%);
        }
        .ws-dropdown-item .ws-dropdown-arrow{
            height: 16px;
            width: 16px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 7px;
            overflow: hidden;
        }
        .ws-dropdown-item.selected{
            position: relative;
            padding-right: 30px !important;
        }
        .ws-dropdown.active .ws-dropdown-item.selected{
            border-bottom:none;
            border-bottom-left-radius:0px;
            border-bottom-right-radius:0px;
        }
        .ws-dropdown-list .ws-dropdown-item:last-child{
            border:none;
        }
        .ws-dropdown.active .ws-dropdown-list {
            border-top-right-radius: 0px;
            border-top-left-radius: 0px;
        }
        .ws-dropdown-list .ws-dropdown-item:first-child{
            // border-top-right-radius: 5px;
            // border-top-left-radius: 5px;
            border-top-right-radius: 0px;
            border-top-left-radius: 0px;
        }
        .ws-dropdown-list .ws-dropdown-item:last-child{
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        .sro_plan_content input[type="radio"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            -o-appearance: none;
            appearance: none;
            height: 20px;
            width: 20px;
            min-height: 20px;
            min-width: 20px;
            background: #fff;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            outline: none;
            vertical-align: middle;
            position: relative;
            border-radius: 100%;
            border: 2px solid #f8a5a6;
            padding: 0px;
        }
        .sro_plan_content input[type="radio"]:checked::after {
            content: "";
            position: absolute;
            height: calc(100% - 4px);
            width: calc(100% - 4px);
            background: #ffa5a5;
            z-index: 0;
            border-radius: 100%;
            top: 2px;
            left: 2px;
        }
        .frequency-title,.selling_select{
			margin:0px;
		}
		.ws-dropdown-item-text {
            user-select: none; /* standard syntax */
            -webkit-user-select: none; /* webkit (safari, chrome) browsers */
            -moz-user-select: none; /* mozilla browsers */
            -khtml-user-select: none; /* webkit (konqueror) browsers */
            -ms-user-select: none; /* IE10+ */
        }
		.day-text{
			text-transform:capitalize;
		}
		`;

    let mainLiSpaceTop = ws_css.mainLiSpaceTop ? ws_css.mainLiSpaceTop : 0;
    let mainLiSpaceRight = ws_css.mainLiSpaceRight ? ws_css.mainLiSpaceRight : 0;
    let mainLiSpaceBottom = ws_css.mainLiSpaceBottom ? ws_css.mainLiSpaceBottom : 0;
    let mainLiSpaceLeft = ws_css.mainLiSpaceLeft ? ws_css.mainLiSpaceLeft : 0;
    let tTitleSpaceBottom = ws_css.tTitleSpaceBottom ? ws_css.tTitleSpaceBottom : 0;
    let tSpaceTop = ws_css.tSpaceTop ? ws_css.tSpaceTop : 0;
    let tSpaceRight = ws_css.tSpaceRight ? ws_css.tSpaceRight : 0;
    let tSpaceBottom = ws_css.tSpaceBottom ? ws_css.tSpaceBottom : 0;
    let tSpaceLeft = ws_css.tSpaceLeft ? ws_css.tSpaceLeft : 0;
    let innerLiSpaceTop = ws_css.innerLiSpaceTop ? ws_css.innerLiSpaceTop : 0;
    let innerLiSpaceRight = ws_css.innerLiSpaceRight ? ws_css.innerLiSpaceRight : 0;
    let innerLiSpaceBottom = ws_css.innerLiSpaceBottom ? ws_css.innerLiSpaceBottom : 0;
    let innerLiSpaceLeft = ws_css.innerLiSpaceLeft ? ws_css.innerLiSpaceLeft : 0;
    let dFontSize = ws_css.dFontSize ? ws_css.dFontSize : 12;
    let dFontColor = ws_css.dFontColor ? ws_css.dFontColor : '#999';
    let dFontWeight = ws_css.dFontWeight ? ws_css.dFontWeight : 400;
    let tFontSize = ws_css.tFontSize ? ws_css.tFontSize : 16;
    let tTitleFontColor = ws_css.tTitleFontColor ? ws_css.tTitleFontColor : '#000';
    let tFontColor = ws_css.tFontColor ? ws_css.tFontColor : '#000';
    let tFontWeight = ws_css.tFontWeight ? ws_css.tFontWeight : 400;
    let fSpaceTop = ws_css.fSpaceTop ? ws_css.fSpaceTop : 0;
    let fSpaceRight = ws_css.fSpaceRight ? ws_css.fSpaceRight : 0;
    let fSpaceBottom = ws_css.fSpaceBottom ? ws_css.fSpaceBottom : 0;
    let fSpaceLeft = ws_css.fSpaceLeft ? ws_css.fSpaceLeft : 0;
    let fFontSize = ws_css.fFontSize ? ws_css.fFontSize : 12;
    let fFontColor = ws_css.fFontColor ? ws_css.fFontColor : "#666";
    let sBorderWidth = ws_css.sBorderWidth ? ws_css.sBorderWidth : 1;
    let sBorderRadius = ws_css.sBorderRadius ? ws_css.sBorderRadius : 1;
    let sBorderStyle = ws_css.sBorderStyle ? ws_css.sBorderStyle : 'solid';
    let sBorderColor = ws_css.sBorderColor ? ws_css.sBorderColor : "#ccc";
    let sBgColor = ws_css.sBgColor ? ws_css.sBgColor : "#fff";
    let sFontSize = ws_css.secondaryFontSize ? ws_css.secondaryFontSize : 14;
    let sFontColor = ws_css.secondaryFontColor ? ws_css.secondaryFontColor : "#494949";
    let sPaddingTop = ws_css.sPaddingTop ? ws_css.sPaddingTop : 0;
    let sPaddingRight = ws_css.sPaddingRight ? ws_css.sPaddingRight : 0;
    let sPaddingBottom = ws_css.sPaddingBottom ? ws_css.sPaddingBottom : 0;
    let sPaddingLeft = ws_css.sPaddingLeft ? ws_css.sPaddingLeft : 0;
    let spBorderWidth = ws_css.spBorderWidth ? ws_css.spBorderWidth : 1;
    let spBorderRadius = ws_css.spBorderRadius ? ws_css.spBorderRadius : 1;
    let spBorderStyle = ws_css.spBorderStyle ? ws_css.spBorderStyle : 'solid';
    let spBorderColor = ws_css.spBorderColor ? ws_css.spBorderColor : "#ccc";
    let tBackgroundColor = ws_css.tBackgroundColor ? ws_css.tBackgroundColor : "#f8f8f8";
    let tSubTitleFontSize = ws_css.tSubTitleFontSize ? ws_css.tSubTitleFontSize : 16;
    let tSubTitleFontColor = ws_css.tSubTitleFontColor ? ws_css.tSubTitleFontColor : "#000";
    let tSubTitleFontWeight = ws_css.tSubTitleFontWeight ? ws_css.tSubTitleFontWeight : 400;
    let tBodyFontSize = ws_css.tBodyFontSize ? ws_css.tBodyFontSize : 14;
    let tBodyFontColor = ws_css.tBodyFontColor ? ws_css.tBodyFontColor : "#000";
    let tBodyFontWeight = ws_css.tBodyFontWeight ? ws_css.tBodyFontWeight : 100;
    let rdSize = ws_css.rdSize ? ws_css.rdSize : 10;
    let wBorderRadius = ws_css.wBorderRadius ? ws_css.wBorderRadius : 10;
    let rdBorderColor = ws_css.rdBorderColor ? ws_css.rdBorderColor : "#a2c2ff";
    let rdBgColor = ws_css.rdBgColor ? ws_css.rdBgColor : "#a2c2ff";
    let wBg = ws_css.wBg ? ws_css.wBg : "#fff";
    let spBg = ws_css.spBg ? ws_css.spBg : "#fff";
    let wBorderWidth = ws_css.wBorderWidth ? ws_css.wBorderWidth : 0;
    let wBorderStyle = ws_css.wBorderStyle ? ws_css.wBorderStyle : 'solid';
    let wBorderColor = ws_css.wBorderColor ? ws_css.wBorderColor : "#ccc";
    let wPaddingTop = ws_css.wPaddingTop ? ws_css.wPaddingTop : 0;
    let wPaddingRight = ws_css.wPaddingRight ? ws_css.wPaddingRight : 0;
    let wPaddingBottom = ws_css.wPaddingBottom ? ws_css.wPaddingBottom : 0;
    let wPaddingLeft = ws_css.wPaddingLeft ? ws_css.wPaddingLeft : 0;
    let wTitlePaddingBottom = ws_css.wTitlePaddingBottom ? ws_css.wTitlePaddingBottom : 10;
    let wTitleFontsize = ws_css.wTitleFontsize ? ws_css.wTitleFontsize : 16;
    let wCustomCss = ws_css.wsCustomCss ? ws_css.wsCustomCss : '';

    let liBorderStyle = "";
    if (ws_css.spPlanBorderBottom) {
        liBorderStyle = ` 
        .selling_plans .selling_plans_item{
            border-width:0px;
            border-bottom-width: `+ spBorderWidth + `px;
            border-radius:0px;
            border-bottom-style: `+ spBorderStyle + `;
            border-color: ` + spBorderColor + `;
        }
        .selling_plans .selling_plans_item:last-of-type{
            border-bottom-width:0px;
        }
        `;
    }

    let commonStyles = `<style id='commonStyles'>`
        + oldCommonCss + commonCss + liBorderStyle +
        `
        .sro_plan_content_title{
            padding-bottom: ` + wTitlePaddingBottom + `px;
            font-size: ` + wTitleFontsize + `px;
        }
        .selling_plan_name p span {
            font-size: ` + dFontSize + `px;
            color: ` + dFontColor + `;
            font-weight: ` + dFontWeight + `;
        }
        .selling_plans{
            background:` + spBg + `;
        }
        .selling_plans_item{
            padding-top: `+ mainLiSpaceTop + `px;
            padding-right: `+ mainLiSpaceRight + `px;
            padding-bottom: `+ mainLiSpaceBottom + `px;
            padding-left: `+ mainLiSpaceLeft + `px;
        }.selling_plan_select{
            padding-top: `+ innerLiSpaceTop + `px;
            padding-right: `+ innerLiSpaceRight + `px;
            padding-bottom: `+ innerLiSpaceBottom + `px;
            padding-left: `+ innerLiSpaceLeft + `px;
        }
        .frequency-title{
            padding-top: `+ fSpaceTop + `px;
            padding-right: `+ fSpaceRight + `px;
            padding-bottom: `+ fSpaceBottom + `px;
            padding-left: `+ fSpaceLeft + `px;
            font-size: ` + fFontSize + `px;
            color: ` + fFontColor + `;
        }
        .ws-tooltip .ws-tooltip-body{
            padding-top: `+ tSpaceTop + `px;
            padding-right: `+ tSpaceRight + `px;
            padding-bottom: `+ tSpaceBottom + `px;
            padding-left: `+ tSpaceLeft + `px;
            background:` + tBackgroundColor + `;
        }
        .ws-tooltip-title a{
            background:` + tBackgroundColor + `;
            color: ` + tBodyFontColor + `;
            border:1px solid `+ tBodyFontColor + `;
        }
        .ws-tooltip:not(.on-hover) .ws-tooltip-title {
            margin-bottom: `+ tTitleSpaceBottom + `px;
        }
        .ws-tooltip .ws-tooltip-title span{
            font-size: ` + tFontSize + `px;
            color: ` + tTitleFontColor + `;
            font-weight: ` + tFontWeight + `;
        }
        .ws-tooltip-title .ws-icon{
            height:` + tFontSize + `px;
            width:` + tFontSize + `px;
         }
         .ws-tooltip-title .ws-icon svg{
            fill: ` + tTitleFontColor + `;
         }
        .ws-tooltip.on-hover .ws-tooltip-body:after {
            border-color: transparent transparent ` + tBackgroundColor + ` transparent;
        }
        .ws-tooltip.on-hover .ws-tooltip-body{
            top: calc(` + tFontSize + `px + 18px);
        }
        .selling_select{
            padding-top: `+ sPaddingTop + `px;
            padding-right: `+ sPaddingRight + `px;
            padding-bottom: `+ sPaddingBottom + `px;
            padding-left: `+ sPaddingLeft + `px;
            border-width: `+ sBorderWidth + `px;
            border-radius: `+ sBorderRadius + `px;
            border-style: `+ sBorderStyle + `;
            border-color: ` + sBorderColor + `;
        }
        
        .ws-dropdown-item{
            background: ` + sBgColor + `;
            font-size : ` + sFontSize + `px;
            color :` + sFontColor + `;
        }
        .ws-dropdown-arrow svg{
            fill :` + sFontColor + `;
        }
        .ws-dropdown-item.selected{
            padding-top: `+ sPaddingTop + `px;
            padding-right: `+ sPaddingRight + `px;
            padding-bottom: `+ sPaddingBottom + `px;
            padding-left: `+ sPaddingLeft + `px;
            border-width: `+ sBorderWidth + `px;
            border-radius: `+ sBorderRadius + `px;
            border-style: `+ sBorderStyle + `;
            border-color: ` + sBorderColor + `;
        }
        .ws-dropdown-list{
            border-width: `+ sBorderWidth + `px;
            border-radius: `+ sBorderRadius + `px;
            border-style: `+ sBorderStyle + `;
            border-color: ` + sBorderColor + `;
        }
        .ws-dropdown-list .ws-dropdown-item{
            padding-top: `+ sPaddingTop + `px;
            padding-right: `+ sPaddingRight + `px;
            padding-bottom: `+ sPaddingBottom + `px;
            padding-left: `+ sPaddingLeft + `px;
            border-bottom-width: `+ sBorderWidth + `px;
            border-bottom-style: `+ sBorderStyle + `;
            border-bottom-color: ` + sBorderColor + `;
        }
        .selling_plans{
            border-width: `+ spBorderWidth + `px;
            border-radius: `+ spBorderRadius + `px;
            border-style: `+ spBorderStyle + `;
            border-color: ` + spBorderColor + `;
        }
        .dynamic-message span{
            font-size: ` + tBodyFontSize + `px;
            color: ` + tBodyFontColor + `;
            font-weight: ` + tBodyFontWeight + `;
        }
        .static-message .static-message-text{
            font-size: ` + tSubTitleFontSize + `px;
            color: ` + tSubTitleFontColor + `;
            font-weight: ` + tSubTitleFontWeight + `;
        }
        .sro_plan_content input[type="radio"] {
            height: ` + rdSize + `px;
            width: ` + rdSize + `px;
            min-height: ` + rdSize + `px;
            min-width: ` + rdSize + `px;
            border: 2px solid ` + rdBorderColor + `;
        }
        .sro_plan_content input[type="radio"]:checked::after {
            background: ` + rdBgColor + `;
        }
        .selling_plans .selling_plans_item:first-of-type{
            border-top-left-radius: ` + spBorderRadius + `px;
            border-top-right-radius: ` + spBorderRadius + `px;
        }

        .selling_plans .selling_plans_item:last-of-type{
            border-bottom-left-radius: ` + spBorderRadius + `px;
            border-bottom-right-radius: ` + spBorderRadius + `px;
        }
        .sro_plan_content{
            background: ` + wBg + `;
            border-color:`+ wBorderColor + `;
            border-width:`+ wBorderWidth + `px;
            border-style:`+ wBorderStyle + `;
            border-radius:`+ wBorderRadius + `px;
            padding-top: `+ wPaddingTop + `px;
            padding-right: `+ wPaddingRight + `px;
            padding-bottom: `+ wPaddingBottom + `px;
            padding-left: `+ wPaddingLeft + `px;
        }
        .main-ws-widget-div{  
        }
    </style > `;
    addCssToHead(commonStyles, "commonStyles");

    //adding customCss
    let wCustomCssContainer = `<style id="wCustomCss">` + wCustomCss + `</style>`;
    addCssToHead(wCustomCssContainer, "wCustomCss");
}
function shopifyFormatMoney(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.', ''); }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    //   var formatString = (format || WSConfig.moneyFormat);
    var formatString = format;

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};
window.handlePlanChange = (planId) => {
    let discountPrice;
    let groupId = '';

    let selectedRadio = document.querySelector('input[value = "' + planId + '"]');
    if (selectedRadio) selectedRadio.setAttribute("name", "selling_plan");


    let selectedPlanId = planId;
    currentVariant.selling_plan_allocations.forEach((selling_plan_allocation) => {
        let priceAdj = selling_plan_allocation;
        if (priceAdj.selling_plan_id === Number(selectedPlanId)) {
            discountPrice = priceAdj.per_delivery_price
            groupId = priceAdj.selling_plan_group_id
            temp1SelectedGroup = {
                groupId: groupId,
                selectedPlanId: selectedPlanId
            }
        }
    });

    handlePricePerDeliveryElement(discountPrice, groupId, true, planId);
    return true;
}
function getValuesFromString(str) {
    let result;
    let finalObj = {};
    result = str.split(";");
    for (let i = 0; i < result.length; i++) {
        let e = result[i];
        if (e != "") {
            finalObj[e.split("=")[0]] = e.split("=")[1];
            if (result.length == 1 && e.split("=").length == 1) {
                dynamicDataFlag = false;
            } else {
                dynamicDataFlag = true;
            }
        }
    }
    return finalObj;
}
function handleTooltipContent(groupId, price, isRadio, radioId) {
    let group = sellingGroups.find(e => e.id == groupId);

    let tooltipDynamic = document.getElementById('dynamicMessage');
    if (tooltipDynamic) tooltipDynamic.innerHTML = "";

    if (ws_css.showTooltip) {
        let select;
        if (isRadio) {
            select = document.querySelector('[name="selling_plan"][value="' + radioId + '"]');
        } else {
            select = document.querySelector('#selling_select_' + groupId);
        }
        if (select && group && group.selling_plans) {
            let data = group.selling_plans.find(e => e.id == Number(select.value));
            if (data && data.options && data.options[0]) {
                let str = data.options[0].value ? data.options[0].value : "";
                patchTooltipContent(getValuesFromString(str));
            }
        }

    }
}
function getWord(type, data) {
    let finalWord = "";
    let specificDayDeliveryDetails = "";
    if (type == "billing" || type == "delivery") {
        let word = data.type.toLowerCase();

        if (data.specificDay && data.specificDay == "true") {
            if (data.specificDayType && data.specificDayType == "specificDay") {
                specificDayDeliveryDetails = `<span> ` + getSpecificDayWord(data); + `</span>`;
            }
        }
        let frequency = type == "billing" ? Number(data.billFrequency) : Number(data.frequency);
        if (frequency == 1) {
            switch (word) {
                case "day":
                    finalWord = ws_css.trFrDaily ? ws_css.trFrDaily : ' daily';
                    break;
                case "week":
                    finalWord = ws_css.trFrWeekly ? ws_css.trFrWeekly : ' weekly';
                    break;
                case "month":
                    finalWord = ws_css.trFrMonthly ? ws_css.trFrMonthly : ' monthly';
                    break;
                case "year":
                    finalWord = ws_css.trFrYearly ? ws_css.trFrYearly : ' yearly';
                    break;
                default:
                    break;
            }
        } else {
            let tmpWord = "";
            switch (word) {
                case "day":
                    tmpWord = ws_css.trFrDay ? " " + ws_css.trFrDay : ' days';
                    break;
                case "week":
                    tmpWord = ws_css.trFrWeek ? " " + ws_css.trFrWeek : ' weeks';
                    break;
                case "month":
                    tmpWord = ws_css.trFrMonth ? " " + ws_css.trFrMonth : ' months';
                    break;
                case "year":
                    tmpWord = ws_css.trFrYear ? " " + ws_css.trFrYear : ' years';
                    break;
            }
            let trFrEvery = ws_css.trFrEvery ? " " + ws_css.trFrEvery + " " : " every ";
            finalWord = trFrEvery + frequency + " " + tmpWord;
        }
    } else if (type == "discount") {
        let value = Number(data.discountValue);
        if (data.discountType == "percentage") {
            finalWord = " " + value + "%";
        } else {
            finalWord = ws_currencies[ws_user_currency]["symbol"] + " " + value;
        }
    } else if (type == "cycle") {
        let trFrCyEnd = ws_css.trFrCyEnd ? " " + ws_css.trFrCyEnd + " " : " and it will deliver until ";
        let trFrCycle = ws_css.trFrCycle ? " " + ws_css.trFrCycle + " " : " cycle ";
        let trFrCycles = ws_css.trFrCycles ? " " + ws_css.trFrCycles : " cycles";
        finalWord = data.minCycle == 1 ? data.minCycle + trFrCycle + " " : data.minCycle + trFrCycles + " ";
        finalWord += trFrCyEnd;
        finalWord += data.maxCycle == 1 ? data.maxCycle + trFrCycle : data.maxCycle + trFrCycles;
    }
    if (type == "delivery") {
        finalWord = finalWord + specificDayDeliveryDetails;
    }
    return finalWord;
}
function stringContainsNumber(_input) {
    let string1 = String(_input);
    for (let i = 0; i < string1.length; i++) {
        if (!isNaN(string1.charAt(i)) && !(string1.charAt(i) === " ")) {
            return true;
        }
    }
    return false;
}
function getSpecificDayWord(data) {
    let finalWord = ``;
    let trFrOn = ws_css.trFrOn ? ws_css.trFrOn + " " : "on ";
    if (stringContainsNumber(data.specificDayValue)) {
        let dayWord = "";
        if (data.specificDayValue == "1" || data.specificDayValue == "21" || data.specificDayValue == "31") {
            dayWord = data.specificDayValue + "<sup>st</sup>";
        } else if (data.specificDayValue == "2" || data.specificDayValue == "22") {
            dayWord = data.specificDayValue + "<sup>nd</sup>";
        } else if (data.specificDayValue == "3" || data.specificDayValue == "23") {
            dayWord = data.specificDayValue + "<sup>rd</sup>";
        } else {
            dayWord = data.specificDayValue + "<sup>th</sup>";
        }
        finalWord = trFrOn + dayWord;
    } else {
        finalWord = trFrOn + ` <span class="day-text">` + data.specificDayValue + `</span>`;
    }
    return finalWord;
}
function patchTooltipContent(data) {
    let trPr = ws_css.trPr ? ws_css.trPr + " " : 'The product will be delivered  ';
    let trBl = ws_css.trBl ? ws_css.trBl + " " : 'Billing will be done ';
    let trFrCy = ws_css.trFrCy ? ws_css.trFrCy + " " : "You can cancel this subscription after ";
    let trFrDis = ws_css.trFrDis ? ws_css.trFrDis + " " : "You will get a discount of ";
    if (dynamicDataFlag) {
        let deliveryDetails = `<span> ` + trPr +
            getWord('delivery', data)
            + `.</span>`;

        if (data.minmaxCycle && data.minmaxCycle == 'true') {
            deliveryDetails += `<span> ` + trFrCy +
                getWord('cycle', data)
                + `.</span>`;
        }

        let billingDetails = `<span> ` + trBl +
            getWord('billing', data)
            + `.</span>`;

        let discountDetails = ws_user_currency != 'NOTFOUND' && !(data.discountType.toLowerCase() == 'none' || data.discountType.toLowerCase() == 'price') ? ` <span>  ` + trFrDis +
            getWord('discount', data)
            + `.</span>` : ` `;

        let tooltipDynamic = document.getElementById('dynamicMessage');
        if (tooltipDynamic) tooltipDynamic.innerHTML = deliveryDetails + billingDetails + discountDetails;

    }
}
function handlePricePerDeliveryElement(discountPrice, groupId, isRadio, radioId) {
    let discountValues = shopifyFormatMoney(discountPrice, WSConfig.moneyFormat);
    let p = document.getElementById('savePrice_' + groupId);
    let dText = ws_css.dText ? ws_css.dText : 'Delivery';
    if (p) {
        if (pricePerDeliveryClass) p.classList.add(pricePerDeliveryClass);
        p.innerHTML = '<span>' + discountValues + '</span><span>/' + dText + '</span>';
    }
    changeProductPrice(discountValues);
    handleTooltipContent(groupId, discountValues, isRadio, radioId);
}
function handleSelectChange(id, option, isRadio, groupId) {
    let selectedOption = document.getElementById(id);
    let discountPrice;
    if (option) {
        let select = selectedOption.querySelector(".selling_select");
        if (select) select.value = option;
    }

    if (selectedOption) {
        selectedOption.classList.add("active")
        let selectedPlanId = selectedOption.querySelector(".selling_select") ? selectedOption.querySelector(".selling_select").value : null;

        if (selectedPlanId) {
            temp1SelectedGroup = {
                groupId: id,
                selectedPlanId: selectedPlanId
            }
            currentVariant.selling_plan_allocations.forEach((selling_plan_allocation) => {
                let priceAdj = selling_plan_allocation;
                if (priceAdj.selling_plan_group_id === id && priceAdj.selling_plan_id === Number(selectedPlanId)) {
                    discountPrice = priceAdj.per_delivery_price;
                }
            });
        }
    }

    handlePricePerDeliveryElement(discountPrice, id, false, '');
}
document.addEventListener("DOMSubtreeModified", function () {
    let eventBindElemets = [
        { selector: "body form[action^='/cart'] input", eventType: "onchange" },
        { selector: "body form[action^='/cart'] select", eventType: "onchange" },
        { selector: "body form[action^='/cart'] button[type='submit']", eventType: "onclick" },
        { selector: "body form[action^='/cart'] button[type='button']", eventType: "onclick" },
        { selector: "body a[href*='/cart']", eventType: "onclick" }
    ];
    for (let i = 0; i < eventBindElemets.length; i++) {
        let eArr = eventBindElemets[i]['selector'];
        let eventType = eventBindElemets[i]['eventType'];
        let singleElement = document.querySelectorAll(eArr);
        if (singleElement.length > 0) {
            for (let j = 0; j < singleElement.length; j++) {
                let element = singleElement[j];
                wssccBindEvent(element, "product", eventType);
            }
        }
    }
});
function updateProductPagePrices(page) {
    try {
        setTimeout(() => {
            if (selectedVariantId !== parseInt(ShopifyAnalytics.meta.selectedVariantId)) {
                selectedVariantId = parseInt(ShopifyAnalytics.meta.selectedVariantId)
                WSConfig.product.variants.forEach((variant, index) => {
                    if (variant.id === selectedVariantId) {
                        currentVariant = variant
                    }
                });
                setPrice();
            }

        }, 500);
    } catch (error) {
        console.log("Error - ", error);
    }
}
function wssccBindEvent(element, page, eventType) {
    if (!element["changeEventaddedd"]) {
        element["changeEventaddedd"] = true;
        element.addEventListener('change', () => { updateProductPagePrices(page) });
    }
}

function setPrice() {
    let oneTimeSelected = document.querySelector(`[onchange="handleChange('One_time')"]`);
    // oneTimeSelected.checked = false;
    if (oneTimeSelected && oneTimeSelected.checked) {
    } else {
        sellingGroups.forEach((sellingGroup, index) => {
            let discountPrice;
            let groupId = '';

            if (temp1SelectedGroup && temp1SelectedGroup.groupId === sellingGroup.id) {
                currentVariant.selling_plan_allocations.forEach((selling_plan_allocation) => {
                    let priceAdj = selling_plan_allocation
                    if (priceAdj.selling_plan_id === Number(temp1SelectedGroup.selectedPlanId)) {
                        discountPrice = priceAdj.per_delivery_price
                        groupId = priceAdj.selling_plan_group_id
                    }
                })
            } else {
                currentVariant.selling_plan_allocations.forEach((selling_plan_allocation) => {
                    let priceAdj = selling_plan_allocation
                    if (priceAdj.selling_plan_id === sellingGroup.selling_plans[0].id) {
                        discountPrice = priceAdj.per_delivery_price
                        groupId = priceAdj.selling_plan_group_id
                    }
                })
            }
            handlePricePerDeliveryElement(discountPrice, groupId, false, '');

        })
    }

    // }
}
function changeProductPrice(discountValues) {
    if (ws_window_width < 600) {
        if (ws_selectors.priceMobSelector && ws_selectors.priceMobSelector.priceSelector && ws_selectors.priceMobSelector.priceSelector.length > 0 && document.querySelector(ws_selectors.priceMobSelector.priceSelector)) {
            document.querySelector(ws_selectors.priceMobSelector.priceSelector).innerHTML = discountValues;
        }
        if (ws_selectors.priceMobSelector && ws_selectors.priceMobSelector.salePriceSelector && ws_selectors.priceMobSelector.salePriceSelector.length > 0 && document.querySelector(ws_selectors.priceMobSelector.salePriceSelector)) {
            document.querySelector(ws_selectors.priceMobSelector.salePriceSelector).innerHTML = discountValues;
        }
    } else {
        if (ws_selectors.priceWebSelector && ws_selectors.priceWebSelector.priceSelector && ws_selectors.priceWebSelector.priceSelector.length > 0 && document.querySelector(ws_selectors.priceWebSelector.priceSelector)) {
            document.querySelector(ws_selectors.priceWebSelector.priceSelector).innerHTML = discountValues;
        }
        if (ws_selectors.priceWebSelector && ws_selectors.priceWebSelector.salePriceSelector && ws_selectors.priceWebSelector.salePriceSelector.length > 0 && document.querySelector(ws_selectors.priceWebSelector.salePriceSelector)) {
            document.querySelector(ws_selectors.priceWebSelector.salePriceSelector).innerHTML = discountValues;
        }
    }
}
window.handleChange = (id) => {
    let isRadio = !ws_css.showDropDown;
    let tmpRadioId = "";
    let allSelectes = document.querySelectorAll(".selling_select");
    for (let i = 0; i < allSelectes.length; i++) {
        const element = allSelectes[i];
        element.removeAttribute("name");
    }
    let mainRadio = document.querySelector(`input[onchange="window.handleChange('` + id + `')"]`);
    if (mainRadio) {
        mainRadio.setAttribute("checked", true);
    }
    let allSelects = document.querySelectorAll(".selling_plan_select");
    for (let i = 0; i < allSelects.length; i++) {
        const element = allSelects[i];
        element.classList.remove("active");
    }
    let allInputs = document.querySelectorAll(".selling_plans_item");
    for (let i = 0; i < allInputs.length; i++) {
        const element = allInputs[i];
        element.classList.remove("active");
        // if (id != 'One_time') {
        // 	if (!element.classList.contains("first")) {
        // 		let innerList = document.getElementById(id);
        // 		if (element.getAttribute("id") == "parent_" + id) {
        // 			element.classList.add("active");
        // 			if (innerList) innerList.classList.add("active");
        // 		} else {
        // 			element.classList.remove("active");
        // 			if (innerList) innerList.classList.remove("active");
        // 		}
        // 	}
        // }
        let innerList = document.getElementById(id);
        if (element.getAttribute("id") == "parent_" + id) {
            element.classList.add("active");
            if (innerList) innerList.classList.add("active");
        } else {
            element.classList.remove("active");
            if (innerList) innerList.classList.remove("active");
        }
    }

    if (ws_css.showDropDown) {
        let activeSelect = document.getElementById("selling_select_" + id);
        if (activeSelect) activeSelect.setAttribute("name", "selling_plan");
        handleSelectChange(id, false, false, false);
    } else {
        //select first radio of inner list
        let selectedOption = document.getElementById("parent_" + id);
        if (selectedOption) {
            var sellingPlanSelect = selectedOption.querySelector(".selling_plan_select");
            if (sellingPlanSelect) {
                var allOptions = sellingPlanSelect.querySelectorAll(".selling_plan_option");
                for (let i = 0; i < allOptions.length; i++) {
                    let singleOption = allOptions[i];
                    let singleOptionRadio = singleOption.querySelector("input[type='radio']");
                    singleOptionRadio.checked = false;
                }
                var sellingPlanOption = sellingPlanSelect.querySelector(".selling_plan_option");
                if (sellingPlanOption) {
                    var selectedSellingPlanRadio = sellingPlanOption.querySelector("input[type='radio'][name='selling_plan']");
                    if (!selectedSellingPlanRadio) {
                        var sellingPlanRadio = sellingPlanOption.querySelector("input[type='radio']");
                        if (sellingPlanRadio) {
                            sellingPlanRadio.checked = true;
                            sellingPlanRadio.setAttribute("name", "selling_plan");
                            tmpRadioId = sellingPlanRadio.value;
                        }
                    } else {
                        tmpRadioId = selectedSellingPlanRadio.value;
                    }
                }
            }
            handleSelectChange(id, false, true, tmpRadioId);
            selectedOption.classList.add("active");
        }
    }

    if (id == 'One_time') {
        discountPrice = Number(WSConfig.selected_or_first_available_variant.price);
        handlePricePerDeliveryElement(discountPrice, id, false, '');
    }
}
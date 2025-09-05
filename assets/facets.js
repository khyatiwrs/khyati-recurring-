class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    this.querySelector('form').addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    }
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer){
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop){
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = element => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl) ?
        FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) :
        FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    const facetDetailsElements =
      parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter');
    const matchesIndex = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    }
    const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
    const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    })

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetElement = target.querySelector('.facets__selected');
    const sourceElement = source.querySelector('.facets__selected');

    if (sourceElement && targetElement) {
      target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      }
    ]
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target.closest('form'));
    const searchParams = new URLSearchParams(formData).toString();
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

class PriceRange extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('input')
      .forEach(element => element.addEventListener('change', this.onRangeChange.bind(this)));

    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('min', 0);
    if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
  }

  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('min'));
    const max = Number(input.getAttribute('max'));

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    this.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault();
      const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
      form.onActiveFilterClick(event);
    });
  }
}

customElements.define('facet-remove', FacetRemove);


// facets.js

function applyFilters() {
  const queryParams = new URLSearchParams(window.location.search);

  // Get selected values from URL (keeping case sensitivity)
  const selectedTag = queryParams.get('filter.p.tag') || '';
  const selectedType = queryParams.get('filter.p.type') || '';
  const selectedVendor = queryParams.get('filter.p.vendor') || '';

  // Get all product items
  const products = document.querySelectorAll('.product-item');

  products.forEach(product => {
    const productTags = (product.getAttribute('data-tags') || '').split(',').map(tag => tag.trim());
    const productTypes = (product.getAttribute('data-types') || '').split(',').map(type => type.trim());
    const productVendors = (product.getAttribute('data-vendor') || '').split(',').map(vendor => vendor.trim());

    // Check if the product matches all selected filters
    const matchesTag = !selectedTag || productTags.includes(selectedTag);
    const matchesType = !selectedType || productTypes.includes(selectedType);
    const matchesVendor = !selectedVendor || productVendors.includes(selectedVendor);

    // Show only products that match all selected filters
    product.style.display = matchesTag && matchesType && matchesVendor ? '' : 'none';
  });

  console.log("Filters Applied:", { selectedTag, selectedType, selectedVendor });

  // **Set the selected value in both desktop and mobile dropdowns**
  const tagFilters = document.querySelectorAll("#tag-filter");
  const typeFilters = document.querySelectorAll("#type-filter");
  const vendorFilters = document.querySelectorAll("#vendor-filter");

  tagFilters.forEach(select => select.value = selectedTag || "");
  typeFilters.forEach(select => select.value = selectedType || "");
  vendorFilters.forEach(select => select.value = selectedVendor || "");
}

// Function to update URL and apply filters **without reloading**
function updateFilters(selectElement, attributeName) {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedValue = selectElement.value;

  if (selectedValue) {
    queryParams.set(`filter.p.${attributeName}`, selectedValue);
  } else {
    queryParams.delete(`filter.p.${attributeName}`);
  }

  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  console.log("Updated URL:", newUrl);

  // **Update URL without reloading**
  // window.history.pushState({}, '', newUrl);
  window.location.href = newUrl;
  applyFilters(); // Reapply filters
}

// Apply filtering and persist selection on page load
document.addEventListener("DOMContentLoaded", () => {
  applyFilters(); // Apply filters when the page loads

  // Attach event listeners to all filter dropdowns (both desktop & mobile)
  document.querySelectorAll("#tag-filter").forEach(select => {
    select.addEventListener("change", function () {
      updateFilters(this, "tag");
    });
  });

  document.querySelectorAll("#type-filter").forEach(select => {
    select.addEventListener("change", function () {
      updateFilters(this, "type");
    });
  });

  document.querySelectorAll("#vendor-filter").forEach(select => {
    select.addEventListener("change", function () {
      updateFilters(this, "vendor");
    });
  });
});


// mobile device for filter
document.querySelectorAll('.facets__disclosure').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      console.log('Details opened');
    } else {
      console.log('Details closed');
    }
  });
});
 document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.mobile-facets__disclosure');

  detailsElements.forEach((details) => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        details.classList.add('menu-opening');
      } else {
        details.classList.remove('menu-opening');
      }
    });
  });
});





// show result product length for filter tag,type,vendor

// document.addEventListener("DOMContentLoaded", function () {
//     function updateProductCount() {
//         let productCountElement = document.getElementById("ProductCountDesktop");
//         let totalProducts = parseInt(productCountElement.getAttribute("data-total-products"));

//         // Select all product grid items
//         let allProducts = document.querySelectorAll(".product-item");

//         // Count only fully visible products (ensures no hidden class is applied)
//         let visibleProducts = Array.from(allProducts).filter(product => {
//             let style = window.getComputedStyle(product);
//             return product.offsetParent !== null && 
//                    style.display !== "none" && 
//                    style.opacity !== "0" && 
//                    style.visibility !== "hidden" &&
//                    !product.classList.contains("hidden") &&  // Shopify may use this
//                    !product.classList.contains("js-hidden") && // Shopify JavaScript hidden
//                    !product.classList.contains("filter-hidden"); // Custom filter-hidden class
//         }).length;

//         // Check if any filter is applied
//         let filtersApplied = document.querySelector("#tag-filter").value.trim() || 
//                              document.querySelector("#type-filter").value.trim() || 
//                              document.querySelector("#vendor-filter").value.trim();

//         // Update product count display
//         if (!filtersApplied) {
//             productCountElement.innerHTML = `${totalProducts} Products`; // Show total products if no filter
//         } else {
//             productCountElement.innerHTML = `${visibleProducts} of ${totalProducts} Products`; // Show filtered count
//         }
//     }

//     // Listen for filter changes
//     document.querySelectorAll("#tag-filter, #type-filter, #vendor-filter").forEach((filter) => {
//         filter.addEventListener("change", function () {
//             setTimeout(updateProductCount, 500); // Small delay to allow filtering effect
//         });
//     });

//     // Listen for pagination changes
//     document.addEventListener("click", function (event) {
//         if (event.target.closest(".pagination__item")) {
//             setTimeout(updateProductCount, 1000); // Delay to allow pagination transition
//         }
//     });

//     // Initial count update after page load
//     setTimeout(updateProductCount, 1000);
// });



// (13)
// document.addEventListener("DOMContentLoaded", function () {
//     function updateProductCount() {
//         let productCountElement = document.getElementById("ProductCount");
//         let totalProductsElement = document.getElementById("ProductCountDesktop");
//         let totalProducts = parseInt(totalProductsElement.getAttribute("data-total-products"));

//         // Select all product grid items
//         let allProducts = document.querySelectorAll(".product-item");

//         // Count only fully visible products (ensures no hidden class is applied)
//         let visibleProducts = Array.from(allProducts).filter(product => {
//             let style = window.getComputedStyle(product);
//             return product.offsetParent !== null && 
//                    style.display !== "none" && 
//                    style.opacity !== "0" && 
//                    style.visibility !== "hidden" &&
//                    !product.classList.contains("hidden") &&  
//                    !product.classList.contains("js-hidden") && 
//                    !product.classList.contains("filter-hidden");
//         }).length;

//         // Check if any filter is applied
//         let filtersApplied = document.querySelector("#tag-filter").value.trim() || 
//                              document.querySelector("#type-filter").value.trim() || 
//                              document.querySelector("#vendor-filter").value.trim();

//         // Update product count display for both mobile & desktop
//         if (!filtersApplied) {
//             productCountElement.innerHTML = `${totalProducts} Products`; // Show total products if no filter
//         } else {
//             productCountElement.innerHTML = `${visibleProducts} of ${totalProducts} Products`; // Show filtered count
//         }
//     }

//     // Listen for filter changes (Mobile & Desktop)
//     document.querySelectorAll("#tag-filter, #type-filter, #vendor-filter").forEach((filter) => {
//         filter.addEventListener("change", function () {
//             setTimeout(updateProductCount, 500); // Small delay to allow filtering effect
//         });
//     });

//     // Listen for pagination changes
//     document.addEventListener("click", function (event) {
//         if (event.target.closest(".pagination__item")) {
//             setTimeout(updateProductCount, 1000); // Delay to allow pagination transition
//         }
//     });

//     // Initial count update after page load
//     setTimeout(updateProductCount, 1000);
// });



// (14)

document.addEventListener("DOMContentLoaded", function () {
    function updateProductCount() {
        let productCountDesktop = document.getElementById("ProductCountDesktop");
        let productCountMobile = document.getElementById("ProductCount");

        // Ensure both elements exist before proceeding
        if (!productCountDesktop || !productCountMobile) {
            console.warn("Product count elements not found!");
            return;
        }

        let totalProducts = parseInt(productCountDesktop.getAttribute("data-total-products")) || 0;

        // Select all product grid items
        let allProducts = document.querySelectorAll(".product-item");

        // Count only fully visible products
        let visibleProducts = Array.from(allProducts).filter(product => {
            let style = window.getComputedStyle(product);
            return product.offsetParent !== null && 
                   style.display !== "none" && 
                   style.opacity !== "0" && 
                   style.visibility !== "hidden" &&
                   !product.classList.contains("hidden") &&  
                   !product.classList.contains("js-hidden") && 
                   !product.classList.contains("filter-hidden");
        }).length;

        // Check if any filter is applied
        let filtersApplied = document.querySelector("#tag-filter")?.value.trim() || 
                             document.querySelector("#type-filter")?.value.trim() || 
                             document.querySelector("#vendor-filter")?.value.trim();

        // Update count display for both mobile and desktop
        let countText = (!filtersApplied) 
            ? `${totalProducts} Products`  // Show total products if no filter
            : `${visibleProducts} of ${totalProducts} Products`;  // Show filtered count

        productCountDesktop.innerHTML = countText;
        productCountMobile.innerHTML = countText;
    }

    // Listen for filter changes on both mobile & desktop
    document.querySelectorAll("#tag-filter, #type-filter, #vendor-filter").forEach((filter) => {
        filter.addEventListener("change", function () {
            setTimeout(updateProductCount, 500); // Small delay for filter effect
        });
    });

    // Listen for pagination changes
    document.addEventListener("click", function (event) {
        if (event.target.closest(".pagination__item")) {
            setTimeout(updateProductCount, 1000); // Delay to allow pagination transition
        }
    });

    // Initial count update after page load
    setTimeout(updateProductCount, 1000);
});






 
(function () {
  const ui = document.querySelector('.custom-subscription-ui');
  if (!ui) return;

  const modeInputs = ui.querySelectorAll('[name^="purchase_mode_"]');
  const plansWrap = ui.querySelector('[data-plans]');
  const planRadios = ui.querySelectorAll('[data-plan-input]');
  const sellingPlanHidden = ui.querySelector('[data-selling-plan-input]');

  // Find the closest form (product form)
  const productForm = ui.closest('form');
  if (!productForm) return;

  // Helper: does current variant support selling plans?
  function currentVariantId() {
    const idInput = productForm.querySelector('input[name="id"]');
    return idInput ? idInput.value : null;
  }

  function showPlans(show) {
    if (!plansWrap) return;
    plansWrap.hidden = !show;
  }

  function clearSellingPlan() {
    sellingPlanHidden.value = '';
  }

  function setSellingPlan(id) {
    sellingPlanHidden.value = id || '';
  }

  // Toggle one-time vs subscription
  modeInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked && input.value === 'subscription') {
        showPlans(true);
        // Auto-select first plan if none chosen
        const first = ui.querySelector('[data-plan-input]');
        if (first && !sellingPlanHidden.value) {
          first.checked = true;
          setSellingPlan(first.value);
        }
      } else if (input.checked && input.value === 'onetime') {
        showPlans(false);
        clearSellingPlan();
      }
    });
  });

  // When user chooses a specific frequency
  planRadios.forEach((r) => {
    r.addEventListener('change', () => setSellingPlan(r.value));
  });

  // If variant changes, ensure the selling plan still applies.
  // (Many themes update the variant id input; we validate at submit time.)
  productForm.addEventListener('submit', (e) => {
    // If one-time, ensure we don't submit an empty selling_plan param (Shopify is fine either way,
    // but we keep it clean).
    const selectedMode = ui.querySelector('[data-onetime]:checked,[data-subscription]:checked');
    if (selectedMode && selectedMode.hasAttribute('data-onetime')) {
      clearSellingPlan();
    } else if (selectedMode && selectedMode.hasAttribute('data-subscription')) {
      // Require a plan id
      if (!sellingPlanHidden.value) {
        e.preventDefault();
        alert('Please choose a delivery frequency.');
      }
    }
  });
})();

/** Keep the imported contact concept, adding semantics and user-supplied building data. */
export function enhanceContactTemplate(html: string) {
  html = html.replace('class="tabs" role="tablist"', 'class="tabs" role="tablist" aria-label="Tipo di richiesta"')
  for (const [key, active] of [['info', true], ['quote', false]] as const) {
    html = html.replace(`role="tab" data-tab="${key}"`, `role="tab" id="tab-${key}" aria-controls="f-${key}" aria-selected="${active}" tabindex="${active ? 0 : -1}" data-tab="${key}"`)
    html = html.replace(`id="f-${key}" novalidate`, `id="f-${key}" role="tabpanel" aria-labelledby="tab-${key}" novalidate`)
  }
  for (const [id, label] of [['qUnits', 'Numero di unità abitative'], ['qBox', 'Numero di box / posti auto']]) {
    html = html.replace(`<span>${label}</span>`, `<label for="${id}">${label}</label>`)
      .replace(`data-step="-1" data-for="${id}"`, `aria-label="Riduci: ${label}" data-step="-1" data-for="${id}"`)
      .replace(`data-step="1" data-for="${id}"`, `aria-label="Aumenta: ${label}" data-step="1" data-for="${id}"`)
  }
  html = html.replace('max="200" value="12"', 'max="200" placeholder="Facoltativo"')
    .replace('max="200" value="6"', 'max="200" placeholder="Facoltativo"')
  for (const [name, id] of [['Ascensore', 'qLift'], ['Riscaldamento centralizzato', 'qHeat'], ['Situazione attuale', 'qSituation']]) {
    html = html.replace(`<span>${name}${name === 'Situazione attuale' ? ' *' : ''}</span><div class="seg">`, `<span id="${id}">${name} *</span><div class="seg" role="group" aria-labelledby="${id}">`)
    html = html.replaceAll(`name="${name}" value="Sì" checked`, `name="${name}" value="Sì" required`)
      .replaceAll(`name="${name}" value="No" checked`, `name="${name}" value="No"`)
    if (name === 'Riscaldamento centralizzato') html = html.replace(`name="${name}" value="Sì"`, `name="${name}" value="Sì" required`)
  }
  return html.replace('id="preview" aria-label=', 'id="preview" hidden aria-label=')
    .replace('id="pvLiftV">Sì', 'id="pvLiftV">Da indicare')
    .replace('id="pvHeatV">Autonomo', 'id="pvHeatV">Da indicare')
    .replace('id="done"><div', 'id="done" tabindex="-1" role="status"><div')
}

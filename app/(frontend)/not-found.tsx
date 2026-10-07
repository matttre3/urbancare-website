import { MockPage } from '@/components/design/MockPage'
import { shell } from '@/lib/design/render'
export default function NotFound() {
  return <MockPage page="articolo" shellOnly html={shell('<main class="legal"><div class="label">404</div><h1>Questa pagina<br>non è nel cortile.</h1><p>Il collegamento potrebbe essere cambiato.</p><a class="btn primary" href="/">Torna alla home →</a></main>')} />
}

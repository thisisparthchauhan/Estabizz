// Legacy URL alias -- permanently consolidated into the canonical page below.
// permanentRedirect (308), not redirect (307): this mapping is not temporary,
// so search engines should transfer ranking signal immediately rather than
// treating the old URL as still potentially canonical.
import { permanentRedirect } from 'next/navigation';

export default function Page() {
    permanentRedirect('/ifsca/batf-services-registration-in-gift-ifsc');
}

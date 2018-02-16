// This prevents bugs with hot module reloading while still allowing live reloading.
if ((module as any).hot) {
  (module as any).hot.accept(function() {
    window.location.reload();
  });
}

import { reverse } from "common/reverse";

console.log(reverse("Hello"));

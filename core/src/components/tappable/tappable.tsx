import { Component, Prop } from '../../../../../stencil/dist';

import { RouterDirection } from '../../interface';
import { openURL } from '../../utils/theme';

@Component({
  tag: 'ion-tappable',
  styleUrl: 'tappable.scss',
  shadow: true
})
export class Tappable {

  @Prop({ context: 'window' }) win!: Window;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href?: string;

  /**
   * When using a router, it specifies the transition direction when navigating to
   * another page using `href`.
   */
  @Prop() routerDirection?: RouterDirection;

  render() {
    const href = this.href;
    if (href != null) {
      return (
        <a
          class="native-button"
          href={this.href}
          onClick={ev => openURL(this.win, href, ev, this.routerDirection)}>
            <slot></slot>
        </a>
      );
    } else {
      return (
        <button type="button" class="native-button">
          <slot></slot>
        </button>
      );
    }
  }
}

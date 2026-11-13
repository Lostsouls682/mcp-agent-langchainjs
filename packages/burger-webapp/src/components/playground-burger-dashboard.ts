import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BurgerDashboard } from './burger-dashboard.js';

/** Presentation-only theme; polling, order grouping and animations remain in BurgerDashboard. */
@customElement('playground-burger-dashboard')
export class PlaygroundBurgerDashboard extends BurgerDashboard {
  protected override render() {
    return html`
      <section class="intro" aria-labelledby="board-title">
        <div><p class="eyebrow">THE PLAYGROUND KITCHEN</p><h1 id="board-title">Fresh burgers, coming right up.</h1>
          <p class="subtitle">Follow your order from the kitchen to pickup. Showing orders from the last 10 minutes.</p></div>
        <span class="refresh-note">Refreshes every 10 seconds</span>
      </section>
      ${this.hasError
        ? html`<div class="error" role="alert">We couldn't refresh the orders. We'll try again automatically.
            <button @click=${() => this.loadOrders()}>Try again</button></div>`
        : html``}
      ${this.renderDashboard()}
    `;
  }

  static override styles = [
    ...BurgerDashboard.styles,
    css`
      :host { display: block; width: 100%; height: auto; min-height: 100%; background: #f7f8fc; background-image: none; color: #191d30; text-align: left; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif; --burger-alt: #6554db; --burger-primary-bg: #fff; }
      h1, h2, p, span { text-shadow: none; }
      .intro { max-width: 1440px; margin: auto; padding: 36px 32px 0; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
      .eyebrow { color: #6554db; font-size: 12px; font-weight: 700; letter-spacing: .12em; margin: 0 0 10px; }
      .intro h1 { margin: 0; font-size: clamp(24px, 3vw, 36px); letter-spacing: -.03em; }
      .subtitle { color: #60657a; font-size: 14px; line-height: 1.6; margin: 12px 0 0; }
      .refresh-note { color: #60657a; font-size: 12px; white-space: nowrap; }
      .container { max-width: 1440px; margin: auto; padding: 24px 32px 32px; height: auto; gap: 24px; }
      .dashboard-header { margin: 0; display: block; }
      .dashboard-header h1 { display: none; }
      .order-counts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .order-count { display: flex; align-items: center; gap: 12px; background: white !important; color: #191d30; border: 1px solid #e8e7f0; border-radius: 16px; padding: 20px 24px; margin: 0; line-height: 1.4; text-transform: none; box-shadow: 0 6px 18px rgb(25 29 48 / 5%); }
      .order-count .count { font-size: 30px; color: #6554db; margin: 0; }
      .order-count .status { font-size: 14px; font-weight: 500; color: #60657a; white-space: normal; }
      .order-count.ready .count { color: #15734b; }
      .dashboard-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; overflow: visible; }
      .orders-column { background: #fff; border: 1px solid #e8e7f0; border-radius: 16px; min-height: 320px; box-shadow: 0 6px 18px rgb(25 29 48 / 4%); }
      .orders-column::after { display: none; }
      .orders-column-container { padding: 24px; grid-template-columns: 1fr; gap: 12px; height: auto; max-height: 65vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #c9c3ec transparent; }
      .orders-column-container h2 { position: sticky; top: -24px; z-index: 1; background: #fff; padding: 12px 0; color: #191d30; font-size: 20px; text-transform: none; text-align: left; }
      .orders-column-container > h2:only-child::after { content: 'No orders here yet'; display: block; padding-top: 60px; text-align: center; color: #60657a; font-size: 14px; font-weight: 400; }
      .order-box { background: #f7f8fc; border: 1px solid #eeedf5; padding: 16px; gap: 12px; box-shadow: none; font-size: 16px; }
      .order-id { color: #191d30; min-width: 0; overflow-wrap: anywhere; font-size: 17px; }
      .order-status { flex: 0 1 auto; background: #eeebff; color: #5140bc; border-radius: 999px; padding: 6px 12px; font-size: 12px; }
      .status-new .order-status { background: #eeebff; color: #5140bc; }
      .status-inprep .order-status { background: #fff1d6; color: #805400; }
      .status-ready .order-status { background: #e1f4e9; color: #15734b; }
      .status-completed { opacity: 1; }
      .status-completed .order-status { background: #e7e9f0; color: #53596c; }
      .order-burger-count { flex: 0 0 auto; color: #60657a; font-size: 16px; }
      .burger { width: 24px; height: 24px; margin: 0 0 0 6px; }
      .error { margin: 24px 32px 0; padding: 16px; background: #fff0f0; color: #9c2626; border: 1px solid #f3cdcd; border-radius: 12px; font-size: 14px; }
      button { margin-left: 12px; background: #6554db; color: #fff; border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; font: inherit; }
      button:focus-visible { outline: 3px solid #6554db; outline-offset: 3px; }
      @media (max-width: 900px) { .dashboard-columns { grid-template-columns: 1fr; } .refresh-note { display: none; } .orders-column-container { max-height: 55vh; } }
      @media (max-width: 480px) { .intro { padding: 24px 16px 0; } .container { padding: 20px 16px; gap: 16px; } .order-counts { gap: 8px; } .order-count { padding: 12px 8px; flex-direction: column; gap: 4px; text-align: center; } .order-count .count { font-size: 24px; } .order-count .status { font-size: 12px; } .orders-column-container { padding: 16px; } .orders-column-container h2 { top: -16px; } .order-box { padding: 12px; gap: 8px; } .error { margin: 16px; } }
      @media (prefers-reduced-motion: reduce) { .order-anim, .order-box, .order-status { transition: none; } .order-anim.fade-in, .order-anim.fade-out { animation-duration: 1ms; } }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-burger-dashboard': PlaygroundBurgerDashboard;
  }
}

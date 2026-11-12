import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ChatComponent } from './chat.js';

/** Presentation variant; retains the existing API, session and history behavior. */
@customElement('sleek-chat')
export class SleekChatComponent extends ChatComponent {
  override async onKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      await this.onSendClicked();
    }
  }

  override async onSendClicked(isRetry = false) {
    if (!isRetry && !this.question.trim()) return;
    await super.onSendClicked(isRetry);
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLTextAreaElement>('.text-input')?.focus();
  }

  protected override renderChatInput = () => html`
    <div class="chat-input">
      <button type="button" class="button new-chat-button" aria-label=${this.options.strings.newChatButton}
        title=${this.options.strings.newChatButton} @click=${() => this.onNewChatClicked()}
        ?disabled=${this.messages.length === 0 || this.isLoading}>+</button>
      <form class="input-form" @submit=${(event: Event) => { event.preventDefault(); void this.onSendClicked(); }}>
        <textarea class="text-input" rows="1" aria-label=${this.options.strings.chatInputPlaceholder}
          placeholder=${this.options.strings.chatInputPlaceholder} .value=${this.question}
          @keydown=${this.onKeyPressed} ?disabled=${this.isLoading}
          @input=${(event: Event) => {
            const input = event.target as HTMLTextAreaElement;
            this.question = input.value;
            input.style.height = 'auto';
            input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
          }}></textarea>
        <button type="submit" class="submit-button" aria-label=${this.options.strings.chatInputButtonLabel}
          title=${this.options.strings.chatInputButtonLabel} ?disabled=${this.isLoading || !this.question.trim()}>↑</button>
        <span class="composer-hint">Enter to send · Shift+Enter for a new line</span>
      </form>
    </div>
  `;

  protected override renderSuggestions = (suggestions: string[]) => html`
    <section class="suggestions-container">
      <div class="welcome-mark" aria-hidden="true">✦</div>
      <p class="eyebrow">YOUR AI ASSISTANT</p>
      <h2>What can I help you with?</h2>
      <p class="welcome-description">${this.options.strings.promptSuggestionsTitle}</p>
      <div class="suggestions">${suggestions.map((suggestion) => html`
        <button type="button" class="suggestion" @click=${() => this.onSuggestionClicked(suggestion)}>
          <span>${suggestion}</span><span aria-hidden="true">↗</span>
        </button>`)}
      </div>
    </section>
  `;

  static override styles = css`
    ${ChatComponent.styles}
    :host {
      --primary: #6554db;
      --bg: #f7f8fc;
      --text-color: #202638;
      --card-bg: #fff;
      --border-color: #dce1ed;
      --card-shadow: 0 4px 24px rgb(33 42 73 / 5%);
      --user-message-bg: linear-gradient(135deg, #6554db, #4b6bdd);
      --suggestion-border: 1px solid #e0e4f0;
      --chat-input-border: 1px solid #dce1ed;
      display: block;
      min-width: 0;
    }
    .chat-container { background: radial-gradient(ellipse at top, #edebff, transparent 65%), var(--bg); }
    .suggestions-container { padding: clamp(32px, 8cqw, 80px) 24px 32px; }
    .welcome-mark { display: grid; place-items: center; width: 64px; height: 64px; margin: auto; border-radius: 20px; background: #6554db; color: white; font-size: 36px; box-shadow: 0 12px 32px #6554db30; }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .18em; color: #6554db; margin-top: 24px; }
    h2 { font-size: clamp(24px, 4cqw, 36px); letter-spacing: -.04em; margin-bottom: 12px; }
    .welcome-description { color: #626b80; line-height: 1.6; margin-bottom: 28px; }
    .suggestion { display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; color: var(--text-color); line-height: 1.5; transition: transform .2s, box-shadow .2s; }
    .suggestion:hover { transform: translateY(-3px); box-shadow: 0 8px 24px #6554db18; }
    .messages { padding: 24px clamp(16px, 4cqw, 40px); gap: 20px; }
    .message { max-width: 80%; border-radius: 20px; animation: reveal .25s ease both; }
    .message.user { border-bottom-right-radius: 6px; animation-name: reveal; }
    .message.assistant { border: 1px solid #e7eaf3; border-bottom-left-radius: 6px; }
    .content { overflow-wrap: anywhere; }
    .message-role { font-size: 12px; opacity: .8; }
    .question { border-color: #ddd8f6; border-radius: 999px; padding: 10px 16px; }
    .chat-input { background: #f7f8fceF; box-shadow: 0 -8px 24px #f7f8fc; }
    .input-form { flex-wrap: wrap; align-items: center; border-radius: 20px; }
    .text-input { box-sizing: border-box; min-width: 0; height: 44px; max-height: 160px; color: var(--text-color); line-height: 1.5; }
    .submit-button { width: 40px; height: 40px; border-radius: 12px; background: #6554db; color: white; font-size: 24px; }
    .submit-button:hover:not(:disabled) { background: #5140c3; }
    .submit-button:disabled { background: #edf0f6; color: #8992a5; }
    .new-chat-button { background: white; color: #6554db; border: 1px solid #dce1ed; align-self: center; }
    .composer-hint { flex-basis: 100%; color: #626b80; font-size: 11px; padding: 4px 6px 0; }
    .current-step { color: #6554db; opacity: 1; }
    @container (width < 480px) {
      .message { max-width: 92%; padding: 18px; }
      .chat-input { padding: 12px; gap: 8px; }
      .composer-hint { font-size: 10px; }
    }
    @keyframes reveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
      .suggestion:hover { transform: none; }
      .loader-animation { transform: scaleX(1); }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap { 'sleek-chat': SleekChatComponent; }
}

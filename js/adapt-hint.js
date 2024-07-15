import Adapt from 'core/js/adapt';
import HintView from './HintView';

class Hint extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, 'componentView:postRender', this.onComponentPostRender);
  }

  onComponentPostRender(view) {
    const hint = view.model.get('_hint');
    if (!hint?._isEnabled) return;

    new HintView({
      model: view.model
    });
  }
}

export default new Hint();

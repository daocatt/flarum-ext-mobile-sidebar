import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import IndexPage from 'flarum/forum/components/IndexPage';

export default class SidebarButton extends Component {

  oninit(vnode) {
    super.oninit(vnode);

    this.$backdrop = null;
    
    document.getElementById('content').addEventListener('click', (e) => {
      if (this.isOpen()) {
        e.preventDefault();
        this.hide();
      }
    });

  }

  backdrop() {
    this.$backdrop = $('<div/>').addClass('drawer-backdrop fade')
      .css('z-index','8888')
      .appendTo('body')
      .on('click', this.hide.bind(this));
  }

  isOpen() {
    return document.getElementsByClassName('IndexPage-nav')[0].classList.contains('sideNavOpen');
  }

  show() {

    document.getElementsByClassName('IndexPage-nav')[0].classList.add('sideNavOpen');

    this.backdrop();

    requestAnimationFrame(() => {
      this.$backdrop.addClass('in');
    });
  }

  hide() {
    document.getElementsByClassName('IndexPage-nav')[0].classList.remove('sideNavOpen');
    this.$backdrop?.remove?.();
  }

  view() {
    
    if(!app.current.matches(IndexPage)){
      return '';
    }
    
    return (
      Button.component({
          icon: 'fas fa-stream',
          id:"sidebarButton",
          onclick: (e: MouseEvent) => {
            e.stopPropagation();
            if(!this.isOpen()){
              this.show();
            }else{
              this.hide();
            }
            
          },
      }, 'MENU')  
    );
  }
  
}

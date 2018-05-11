import { AnimationBuilder, ComponentProps, ComponentRef, FrameworkDelegate } from '../../interface';

export interface PopoverOptions<T extends ComponentRef = ComponentRef> {
  component: T;
  componentProps: ComponentProps<T>;

  showBackdrop?: boolean;
  enableBackdropDismiss?: boolean;
  translucent?: boolean;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
  cssClass?: string | string[];
  ev: Event;
  delegate?: FrameworkDelegate;
}

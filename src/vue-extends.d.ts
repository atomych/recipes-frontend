import infrastructure from '@/infrastructure';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $infra: typeof infrastructure;
  }
}

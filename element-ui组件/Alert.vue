<template>
  <transition name="alert-fade">
    <div
      class="alert"
      :class="[typeClass, center ? 'is-center' : '']"
      v-show="visible"
      role="alert"
    >
      <i class="alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="alert__content">
        <span class="alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="alert__description" v-if="description">{{ description }}</p>
        </slot>
        <i class="alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }"
           v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'icon-success',
    'warning': 'icon-warning',
    'error': 'icon-error'
  };
  export default {
    name: 'Alert',
    props: {
      title: {//标题，必选参数
        type: String,
        default: '',
        required: true
      },
      description: {//辅助性文字。也可通过默认 slot 传入
        type: String,
        default: ''
      },
      type: {//主题
        type: String,
        default: 'info'
      },
      closable: {//是否可关闭
        type: Boolean,
        default: true
      },
      closeText: {//关闭按钮自定义文本
        type: String,
        default: ''
      },
      showIcon: Boolean,//是否显示图标
      center: Boolean//文字是否居中
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      close() {//关闭alert时触发的事件
        this.visible = false;
        this.$emit('close');
      }
    },
    computed: {
      typeClass() {
        return `alert--${ this.type }`;
      },
      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'icon-info';
      },
      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },
      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>
<style scoped>
  .alert{
    width: 100%;
    padding: 8px 16px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    transition: opacity .2s;
  }
  .icon-success{
    background-color: #f0f9eb;
    color: #67c23a;
  }
  .icon-warning{
    background-color: #fdf6ec;
    color: #e6a23c;
  }
  .icon-error{
    background-color: #fef0f0;
    color: #f56c6c;
  }
  .icon-info{
    background-color: #f4f4f5;
    color: #909399;
  }
  .alert__icon{
    font-size: 16px;
    width: 16px;
  }
  .alert__content{
    display: table-cell;
    padding: 0 8px;
  }
  .alert__title{
    font-size: 13px;
    line-height: 18px;
  }
  .alert__description{
    font-size: 12px;
    margin: 5px 0 0;
  }
  .alert__closebtn{
    font-size: 12px;
    color: #c0c4cc;
    opacity: 1;
    position: absolute;
    top: 12px;
    right: 15px;
    cursor: pointer;
  }
  .is-big{
    font-size: 28px;
    width: 28px;
  }
  .is-bold{
    font-weight: 700;
  }
</style>

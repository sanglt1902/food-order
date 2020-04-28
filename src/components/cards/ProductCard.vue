<template>
  <div class="team-player">
    <md-card class="md-card-plain">
      <div class="md-layout-item md-size-50 mx-auto">
        <img
          :src="data.image"
          alt="Thumbnail Image"
          class="img-raised rounded img-fluid"
        />
      </div>
      <h4 class="card-title">
        {{ data.name }}
        <br />
        <small class="card-description text-muted"
          >{{ data.price.toLocaleString() }} Đồng</small
        >
      </h4>

      <md-card-content>
        <p class="card-description">{{ data.description }}</p>
      </md-card-content>

      <md-card-actions class="text-center">
        <md-button class="md-success" @click="addMoreItem(data)"
          >Thêm món này</md-button
        >
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "product-card",
  props: {
    data: Object
  },
  methods: {
    addMoreItem(item) {
      this.$store.dispatch("cart/addItemToCart", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>

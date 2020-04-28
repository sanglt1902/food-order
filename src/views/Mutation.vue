<template>
  <div class="wrapper">
    <notifications></notifications>
    <!-- --------------------------------START MODAL---------------------------------- -->
    <modal
      class="modal-edit-page"
      v-if="classicModal"
      @close="classicModalHide"
    >
      <template slot="header">
        <h4 class="modal-title">
          {{ modalData.id ? "Chỉnh sửa món ăn" : "Thêm món ăn" }}
        </h4>
        <md-button
          class="md-simple md-just-icon md-round modal-default-button"
          @click="classicModalHide"
        >
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <form class="contact-form" id="form" @submit.prevent="saveProduct">
          <div class="md-layout">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Tên Món Ăn</label>
                <md-input v-model="modalData.name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Giá</label>
                <md-input v-model="modalData.price" type="number"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Hình Ảnh</label>
                <md-file @change="onFileChange" ref="file" id="file"></md-file>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <div class="md-size-30 md-xsmall-size-50 mx-auto">
                <img
                  :src="this.url || modalData.image || teamImg1"
                  alt="Thumbnail Image"
                  class="img-raise rounded img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label for="category">Loại</label>
                <md-select v-model="category" name="category" id="category">
                  <md-option
                    v-for="(item, x) in this.categories"
                    :key="x"
                    :value="item.id"
                    >{{ item.categoryName }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-50">
              <md-checkbox v-model="modalData.isBreakfast"
                >Điểm Tâm Sáng</md-checkbox
              >
            </div>
            <div class="md-layout-item md-size-50">
              <md-checkbox v-model="modalData.isBreakfast"
                >Trong Ngày</md-checkbox
              >
            </div>
          </div>
          <md-field maxlength="5">
            <label>Miêu Tả</label>
            <md-textarea v-model="modalData.description"></md-textarea>
          </md-field>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" type="submit" form="form">Lưu</md-button>
        <md-button class="md-danger md-simple" @click="classicModalHide"
          >Huỷ</md-button
        >
      </template>
    </modal>
    <!-- -------------------------------- END MODAL---------------------------------- -->
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Chỉnh Sửa Menu</h1>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-100 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Chỉnh Sửa Món Ăn</h2>
              <md-table table-header-color="green">
                <md-table-row>
                  <md-table-head>Hình Ảnh</md-table-head>
                  <md-table-head>Tên Món</md-table-head>
                  <md-table-head>Đơn Giá</md-table-head>
                  <md-table-head>Món Sáng</md-table-head>
                  <md-table-head>Món Trong Ngày</md-table-head>
                  <md-table-head>Chỉnh Sửa</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item, x) in this.menu" :key="x">
                  <md-table-cell>
                    <div class="md-size-30 md-xsmall-size-50 mx-auto">
                      <img
                        :src="item.image"
                        alt="Thumbnail Image"
                        class="img-raised rounded img-fluid"
                      />
                    </div>
                  </md-table-cell>
                  <md-table-cell>{{ item.name }}</md-table-cell>
                  <md-table-cell
                    >{{ item.price.toLocaleString() }} đồng</md-table-cell
                  >
                  <md-table-cell>
                    <md-checkbox v-model="item.isBreakfast"
                      >Checked</md-checkbox
                    >
                  </md-table-cell>
                  <md-table-cell>
                    <md-checkbox v-model="item.isBreakfast"
                      >Checked</md-checkbox
                    >
                  </md-table-cell>
                  <md-table-cell>
                    <md-button
                      class="md-button md-success md-simple md-theme-default"
                      @click="openModel(item)"
                    >
                      <i class="fas fa-edit"></i>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <div class="md-layout">
                <div class="md-layout-item md-size-33 mx-auto text-center">
                  <md-button class="md-success" @click="openModel({})"
                    >Thêm món</md-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "@/components";
import { ADD_PRODUCT, GET_PRODUCTS, GET_CATEGORIES } from "@/graphql";
export default {
  components: {
    Modal
  },
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/buncha.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/banhmibo.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/hamburger.jpg")
    },
    teamImg4: {
      type: String,
      default: require("@/assets/img/faces/xoi.jpg")
    },
    teamImg5: {
      type: String,
      default: require("@/assets/img/faces/mixaobo.jpg")
    }
  },
  data() {
    return {
      modalData: {},
      url: "",
      classicModal: false,
      name: "Sang",
      phone: "0394448799",
      note: "nhiều topping",
      address: "số 5 hẻm 31 cmt8",
      category: "",
      menu: [
        {
          image: this.teamImg1,
          name: "Bún Chả",
          price: 25000,
          id: 1,
          description: "Bún Chả bao ngon bao cay",
          isBreakfast: true
        },
        {
          image: this.teamImg2,
          name: "Bánh Mì Bơ Tỏi",
          price: 35000,
          id: 2,
          description: "Bánh Mì Bơ Tỏi bao ngon bao thơm bơ tỏi",
          isBreakfast: false
        },
        {
          image: this.teamImg5,
          name: "Mì Xào Bò",
          price: 35000,
          id: 5,
          description: "Mì Xào Bò bao ngon bao dai",
          isBreakfast: false
        },
        {
          image: this.teamImg4,
          name: "Xôi Phúc Kiến",
          price: 20000,
          id: 4,
          description: "Xôi Phúc Kiến bao ngon bao kiến",
          isBreakfast: false
        },
        {
          image: this.teamImg3,
          name: "Hamburger",
          price: 15000,
          id: 3,
          description: "Hamburger bao ngon bao gơ",
          isBreakfast: true
        }
      ]
    };
  },
  apollo: {
    categories: {
      query: GET_CATEGORIES,
      update: data => data.getAllCategories
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    cart() {
      return this.$store.getters.cart;
    },
    totalPrice() {
      let total = 0;

      for (const item of this.$store.getters.cart) {
        total += item.totalPrice;
      }

      return total;
    }
  },
  methods: {
    classicModalHide() {
      this.classicModal = false;
      this.modalData = {};
    },
    openModel(item) {
      this.classicModal = true;
      this.modalData = { ...item };
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.modalData.file = file;
      this.url = URL.createObjectURL(file);
    },
    saveProduct() {
      this.$apollo
        .mutate({
          mutation: ADD_PRODUCT,
          variables: {
            productName: this.modalData.productName,
            categoryId: this.modalData.categoryId,
            idBreakfast: this.modalData.idBreakfast,
            isTodayFood: this.modalData.isTodayFood,
            price: this.modalData.price,
            description: this.modalData.description,
            image: this.modalData.file
          }
        })
        .then(data => {
          console.log(data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
  padding: 0;
}
.md-table-cell-container {
  padding: 3px;
}
.md-button.md-success.md-simple {
  display: contents;
}
img:not(.md-image) {
  width: 50px;
}
.md-table-cell {
  padding: 0;
}
.notifications.vue-notifyjs {
  .alert {
    z-index: 100;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
  .modal-edit-page {
    z-index: 300;
  }
  .md-select-menu {
    z-index: 10000 !important;
  }
  .md-ripple > span {
    position: unset !important;
  }
}
</style>

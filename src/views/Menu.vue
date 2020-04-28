<template>
  <div class="wrapper">
    <notifications></notifications>
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Điểm Tâm A Tý</h1>
            <h4>Rất Hân Hạnh Được Phục Vụ Quí Dị!</h4>
            <br />
            <!-- <md-button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              class="md-success md-lg"
              target="_blank"
            >
              <i class="fas fa-play"></i> Watch video
            </md-button>-->
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Điểm Tâm Sáng</h2>
              <h5 class="description">
                Mấy món này chỉ có buổi sáng thoy nghe Quý Dị!
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100"
                v-for="(item, x) in breakfastMenu"
                :key="x"
              >
                <product-card v-bind:data="item"></product-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Thực Đơn Hôm Nay</h2>
          <div class="team">
            <div class="md-layout">
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100"
                v-for="(item, x) in this.menu"
                :key="x"
              >
                <product-card v-bind:data="item"></product-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Đơn Hàng Của Quí Dị</h2>
              <h4 class="text-center description">
                Cho tiểu nhị xin vài đặc điểm nhận dạng của Quí Dị đi để kêu mấy
                thằng đệ ship liền ạ
              </h4>
              <md-table table-header-color="green">
                <md-table-row>
                  <md-table-head>Tên Món</md-table-head>
                  <md-table-head>Đơn Giá</md-table-head>
                  <md-table-head>Số Lượng</md-table-head>
                </md-table-row>

                <md-table-row v-for="(item, x) in cart" :key="x">
                  <md-table-cell>{{ item.name }}</md-table-cell>
                  <md-table-cell
                    >{{ item.price.toLocaleString() }} đồng</md-table-cell
                  >
                  <md-table-cell>
                    <md-button
                      class="md-button md-success md-simple md-theme-default"
                      @click="addMoreItem(item)"
                    >
                      <i class="fas fa-plus"></i>
                    </md-button>
                    <md-field class="has-info quantity">
                      <label>{{ item.quantity }}</label>
                    </md-field>
                    <md-button
                      class="md-button md-danger md-simple md-theme-default"
                      @click="substractItem(item)"
                    >
                      <i class="fas fa-minus"></i>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell />
                  <md-table-cell class="total-cash-title"
                    >Tổng Cộng</md-table-cell
                  >
                  <md-table-cell class="total-cash"
                    >{{ totalPrice.toLocaleString() }} đồng</md-table-cell
                  >
                </md-table-row>
              </md-table>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Đôi Nét Về Quí Dị Ạ!</h2>
              <h4 class="text-center description">
                Cho tiểu nhị xin vài đặc điểm nhận dạng của Quí Dị đi để kêu
                ngựa ship liền ạ
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Tên Của Quí Dị Ạ!</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Số Điện Thoại đi ạ</label>
                      <md-input v-model="phone" type="phone"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field>
                  <label>Địa chỉ ở đâu ạ!</label>
                  <md-input v-model="address" type="text"></md-input>
                </md-field>
                <md-field maxlength="5">
                  <label>
                    Có dặn dò gì không ạ (thời gian giao, thêm ớt, thêm đường,
                    thêm tứa lưa ạ...)
                  </label>
                  <md-textarea v-model="note"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" @click="confirmOrder"
                      >Đặt Hàng</md-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductCard } from "@/components";

export default {
  components: {
    ProductCard
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
      name: "Sang",
      phone: "0394448799",
      note: "nhiều topping",
      address: "số 5 hẻm 31 cmt8",
      menu: [
        {
          image: this.teamImg1,
          name: "Bún Chả",
          price: 25000,
          id: 1,
          description: "Bún Chả bao ngon bao cay"
        },
        {
          image: this.teamImg2,
          name: "Bánh Mì Bơ Tỏi",
          price: 35000,
          id: 2,
          description: "Bánh Mì Bơ Tỏi bao ngon bao thơm bơ tỏi"
        },
        {
          image: this.teamImg5,
          name: "Mì Xào Bò",
          price: 35000,
          id: 5,
          description: "Mì Xào Bò bao ngon bao dai"
        },
        {
          image: this.teamImg4,
          name: "Xôi Phúc Kiến",
          price: 20000,
          id: 4,
          description: "Xôi Phúc Kiến bao ngon bao kiến"
        },
        {
          image: this.teamImg3,
          name: "Hamburger",
          price: 15000,
          id: 3,
          description: "Hamburger bao ngon bao gơ"
        }
      ]
    };
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
    },
    breakfastMenu() {
      const breakfastMenu = this.menu.filter(item => {
        if (item.isBreakfast) return item;
      });
      return breakfastMenu;
    }
  },
  methods: {
    addMoreItem(item) {
      this.$store.dispatch("cart/addItemToCart", item);
    },
    substractItem(item) {
      this.$store.dispatch("cart/subtractItemFromCart", item);
    },
    removeItem(item) {
      this.$store.dispatch("cart/removeItemFromCart", item);
    },
    confirmOrder() {
      const userInfo = {
        name: this.name,
        phone: this.phone,
        address: this.address,
        note: this.note
      };
      let userCart = this.cart.map(item => {
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        };
      });
      userCart.totalPrice = this.totalPrice;
      this.$notify({
        message: "Đặt Hàng Thành Công Rồi Nghe Quí Dị!",
        type: "success",
        horizontalAlign: "right",
        verticalAlign: "bottom",
        timeOut: 300000,
        icon: "fa fa-gift"
      });
      console.log(JSON.stringify({ userInfo, userCart }));
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
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
}
</style>

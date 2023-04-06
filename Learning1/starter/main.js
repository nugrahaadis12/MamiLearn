var eventBus = new Vue()

//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText" />
            </div>

            <div class="product-info">
                <h1>{{ product }}</h1>
                <h3>{{ title }}</h3>
                <p>Shipping Pay {{ shipping }}</p>
                <p>{{ description }}</p>
                <p>{{ altText }}</p>

                <!-- Stock of Data -->

                <!-- <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0 ">Almost Sold Out</p>
                <p v-else>Out of Stock</p> -->


                <!-- Sale Sign -->
                <p v-if="onSale">On Sale!!</p>
                <p v-else>Sold Out</p>

                <!-- List Rendering Details-->
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <!-- List Rendering Variants -->
                <p v-if="inStock > 0">In Stock</p>
                <p v-else>Out of stock</p>
                <div v-for="(variant, index)  in variants" :key="variant.variantId" class="color-box"
                    :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
                </div>
                <!-- <ul>
                    <li v-for="variant in variants">{{ variant.variantColor}}</li>
                </ul> -->


                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to
                    cart</button>

                <div class="cart">
                    <p>Cart({{ cart }})</p>
                </div>
            </div>

            <product-tabs :reviews="reviews" ></product-tabs>
        </div>
        `,
  data() {
    return {
      product: 'Socks',
      brand: "Vue Mastery",
      description: 'A pair of warm fuzzy socks',
      // image: "./assets/vmSocks-green-onWhite.jpeg",
      selectedVariant: 0,
      altText: "A pair of socks",
      // inStock: true,
      inventory: 0,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: './assets/vmSocks-green-onWhite.jpeg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: './assets/vmSocks-blue-onWhite.jpeg',
          variantQuantity: 0
        }
      ],
      cart: 0,
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index);
    },
    // addReview(productReview) {
    //   this.reviews.push(productReview)
    // }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "free"
      }
      else {
        return "Rp 20.000"
      }
    },
    // stockTotal() {
    //   return this.variantQuantity
    // }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

//Product-Form-Review
Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      eventBus.$emit('review-submitted', productReview)
      this.name = null
      this.review = null
      this.rating = null
    }
  },
})

//Product-Tabs
Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <span class="tab" 
      :class="{ activeTab: selectedTab === tab}"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab">
        {{ tab }}
    </span>

    <p v-show="selectedTab === 'Reviews'">There are no Review</p>

    <product-review v-show="selectedTab === 'Make a Review'" @review-submitted="addReview"></product-review>

  </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Review'
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
})
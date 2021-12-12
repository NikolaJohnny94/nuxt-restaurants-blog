<template>
    <div>
        <div v-if="category.name">
            <h1 class="text-center mb-3 mt-3">
                <em>#{{ category.name }}</em>
            </h1>
            <b-row>
                <b-col
                    v-for="restaurant in itemsPerPage"
                    :key="restaurant.id"
                    xs="10"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <NuxtLink :to="`/restaurant/${restaurant.id}`">
                        <b-card
                            :title="restaurant.name"
                            :img-src="restaurant.images[0].name"
                            img-alt="Image"
                            img-top
                            tag="article"
                            class="m-3"
                        >
                            <b-card-text>{{ restaurant.description.substring(0, 185) }}...</b-card-text>
                        </b-card>
                    </NuxtLink>
                </b-col>
            </b-row>

            <b-row class="mt-4" align-h="center">
                <b-pagination
                    class="bg-dark"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="data_list"
                ></b-pagination>
            </b-row>
            <b-button
                variant="danger"
                class="text-light back-button mt-2 ml-2 mb-2"
                @click="$router.go(-1)"
            >Back</b-button>
        </div>
        <div class="spinner-container" v-else>
            <b-row>
                <div class="text-center mb-3 d-flex justify-content-between m-auto">
                    <h2 class="text-success spinner-text">
                        <em>Loading...</em>
                    </h2>
                    <b-spinner variant="success"></b-spinner>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            perPage: 4,
            currentPage: 1,
            category: {},
            restaurants: [],
            og_image_url: 'https://images.unsplash.com/photo-1478144592103-25e218a04891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80'
        }
    },
    head() {
        return {
            title: `${this.category.name} 🍴👨‍🍳 | Nuxt.js ⛰️ & Strapi.io App 🚀`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `${this.category.name} category 🍴🍝🍰☕ Restaurants blog made with Nuxt.js 2 and BootstrapVue ⛰️, fetching data from the Strapi.io API 🚀`
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.og_image_url
                }
            ]
        }
    },
    async mounted() {
        const res = this.$axios.$get(`/categories/${this.$route.params.id}`).then(res => {
            this.category = res,
                this.restaurants = res.restaurants
        })
    },
    computed: {
        itemsPerPage() {
            return this.restaurants
                .slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                );
        },
        rows() {
            return this.restaurants.length
        },
    }
}
</script>

<style scoped>
a {
    color: #000 !important;
    text-decoration: none !important;
}
.card {
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
}
.spinner-container {
    margin-top: 15%;
}
.spinner-text {
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}

@media (max-width: 480px) {
    .row {
        justify-content: center;
    }
}

@media (min-width: 1367px) {
    .back-button {
        margin-top: 2.5% !important;
    }
}
</style>
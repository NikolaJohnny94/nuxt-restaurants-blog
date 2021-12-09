<template>
    <div>
        <h1 class="text-center mb-3 mt-3">
            <em>#{{ category.name }}</em>
        </h1>
        <b-row>
            <b-col
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                xs="10"
                sm="6"
                md="4"
                lg="3"
                class="p-0"
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
        <b-button variant="danger" class="text-light back-button ml-3" @click="$router.go(-1)">Back</b-button>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            category: {},
            restaurants: []
        }
    },
    head() {
        return {
            title: `${this.category.name} 🍴👨‍🍳 | Nuxt.js ⛰️ & Strapi.io App 🚀`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Lorem ipsum'
                }
            ]
        }
    },
    async mounted() {
        const res = this.$axios.$get(`/categories/${this.$route.params.id}`).then(res => {
            this.category = res,
                this.restaurants = res.restaurants
        })
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

@media (max-width: 480px) {
    .row {
        justify-content: center;
    }
}
</style>
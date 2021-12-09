<template>
    <div>
        <p>
            <img class="mt-3" :src="profile_image" :alt="altText" :title="caption" />
        </p>
        <p class="text-center">
            <em>{{ person.username }}</em>
        </p>
        <p class="text-center">
            <strong>First name:</strong>
            <br />
            {{ person.firstname }}
        </p>
        <p class="text-center">
            <strong>Last name:</strong>
            <br />
            {{ person.lastname }}
        </p>
        <p class="text-center">
            <strong>About:</strong>
            <br />
            {{ person.about }}
        </p>
        <b-button variant="danger" class="text-light back-button ml-3" @click="$router.go(-1)">Back</b-button>
    </div>
</template>

<script>
export default {
    name: 'PersonPage',
    data() {
        return {
            person: {},
            profile_image: '',
            altText: '',
            caption: ''
        }
    },
    head() {
        return {
            title: `${this.person.username} ${this.person.gender === 'male' ? '🧔' : this.person.gender === 'female' ? '👩' : '🙂'} | Nuxt.js ⛰️ & Strapi.io App 🚀`,
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
        const res = await this.$axios.$get(`/persons/${this.$route.params.id}`).then(res => {
            this.person = res
            this.profile_image = res.profile_image.name,
                this.altText = res.profile_image.alternativeText,
                this.caption = res.profile_image.caption
        })
    }
}
</script>

<style scoped>
img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    display: block;
    margin: auto;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>
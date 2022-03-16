<template>
  <p>
    <img :src="profile_image" :alt="altText" />
    {{ person.username }}
  </p>
</template>

<script>
export default {
  name: "Person",
  props: ["id"],
  data() {
    return {
      person: {},
      profile_image: "",
      altText: ""
    }
  },
  async fetch() {
    const res = await this.$axios
      .$get(`${process.env.API}/persons/${this.id}`)
      .then((res) => {
        this.person = res
        this.profile_image = res.profile_image.name
        this.altText = res.profile_image.alternativeText
      })
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>

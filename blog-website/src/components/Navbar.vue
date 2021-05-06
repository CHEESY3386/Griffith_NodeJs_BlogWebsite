<template>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container>
        <h1 class="nav_title">
          <router-link to="/" id="title">THE BLOG</router-link>
        </h1>
      </v-container>
      <v-container v-if="this.$store.state.loggedin" class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="option in options"
          :key="option"
          text
        >
          {{ option }}
        </v-btn>
      </v-container>
      <v-container v-else class="py-0 fill-height">
        <v-btn
          v-for="link in links"
          :key="link"
          text
          v-on:click="nav(link)"
          
        >
          {{ link }}
        </v-btn>
      </v-container>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
    </v-app-bar>
</template>

<script>

export default {
    name: 'navbar',
    data: () => ({
      links: [
          'Login',
          'Signup'
      ],
      options: [
          'Feed',
          'My Posts'
      ]
    }),
    methods: {
        nav(link) {
            if (link == 'Login') this.$router.push('/login')
            if (link == 'Signup') this.$router.push('/signup')
        },
        // menu(option) {
        // }
    }
};
</script>
<template>
    <v-app>
      <navbar/>
      <v-main class="grey lighten-3">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet
                min-height="70vh"
                rounded="lg"
              >
              <router-view id="app"></router-view>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default { 
  name: 'app',
  components: { Navbar },
  data: () => ({})
}
</script>

<style>
@import './assets/global.css';
</style>
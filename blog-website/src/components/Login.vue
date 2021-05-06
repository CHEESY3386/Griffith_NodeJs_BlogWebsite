<template>
    <v-container class="form">
        <v-card flat>
        <v-card-title primary-title>
            <h4>Login</h4>
        </v-card-title>
        <v-form>
        <v-text-field name="Email" label="Email" v-model="email"></v-text-field>
        <v-text-field name="Password" label="Password" type="password" v-model="password"></v-text-field>
        <v-card-actions>
            <v-btn primary large block v-on:click="loginAccount(email, password)">Login</v-btn>
        </v-card-actions>
        </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { loginUser } from '../services/userServices'
import { setCookie } from '../services/Cookies'

export default {
    name: 'login',
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        async loginAccount(em, pw) {
            var res;
            if (em && pw) {       
                res = await loginUser({
                    email: em,
                    password: pw
                })
            }
            if (res.token) {
                setCookie('token', res.token, 1);
                this.$store.commit('login')
                this.$router.push('/')
            }
        }
    }
};
</script>
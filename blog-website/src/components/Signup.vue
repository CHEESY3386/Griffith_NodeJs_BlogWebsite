<template>
    <v-container class="form">
        <v-card flat>
            <v-card-title primary-title>
            <h4>Signup</h4>
            </v-card-title>
            <v-form>
            <v-text-field name="Username" label="Username" v-model="username"></v-text-field>
            <v-text-field name="Email" label="Email (must be valide)" v-model="email"></v-text-field>
            <v-text-field name="Password" label="Password" type="password" v-model="password"></v-text-field>
            <v-card-actions>
            <v-btn primary large block v-on:click="createAccount(username, email, password)">Create account</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { createUser } from '../services/userServices'
import { setCookie } from '../services/Cookies'

export default {
    name: 'signup',
    data: () => ({
        username: '',
        email: '',
        password: ''
    }),
    methods: {
        async createAccount(un, em, pw) {
            var res;
            if (un && em && pw) {
                res = await createUser({
                    username: un,
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
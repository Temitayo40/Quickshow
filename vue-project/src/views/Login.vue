<template>
  <form @submit="handleSubmit(onSubmit)">
    <h2>Login</h2>

    <div>
      <label>Email:</label>
      <input v-model="values.email" type="email" />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="values.password" type="password" />
      <p v-if="errors.password" class="error">{{ errors.password }}</p>
    </div>

    <p v-if="loginError" class="error">{{ loginError }}</p>

    <button type="submit">Login</button>

    <p v-if="isLoggedIn">✅ Welcome back!</p>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// Login form schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
});

const loginError = ref("");
const isLoggedIn = ref(false);

const onSubmit = (formValues: any) => {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const user = storedUsers.find(
    (u: any) => u.email === formValues.email && u.password === formValues.password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    isLoggedIn.value = true;
    loginError.value = "";
    router.push("/dashboard");
  } else {
    loginError.value = "Invalid email or password";
    isLoggedIn.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
form {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}
</style>

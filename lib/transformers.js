module.exports = {
    user: (row) => {
      return {
        user_id: row.user_id,
        username: row.username,
        refresh_token: row.refresh_token,
        token: row.token,
      }
    },

    resetToken: (row) => {
      return {
        username: row.username,
        token_expired: row.reset_token,
      }
    },
  };
  
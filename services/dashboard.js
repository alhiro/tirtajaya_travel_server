const Sequelize = require('../config/sequelize');

module.exports =
  {  
    getNewCustomer: async () => {
        try{
            return Sequelize.query(
                `select 
                   id,
                   partner_id,
                   name,
                   image_url
                    from (
                        SELECT
                        partner_id,
                        id,
                        name,
                        image_url,
                        created_at,
                        ROW_NUMBER () OVER (PARTITION BY partner_id
                            ORDER by created_at desc) rowno
                        FROM
                        partner_portfolio
                    ) newportflio
                    where rowno = 1
                    order by created_at desc
                    limit 8;`,
                { 
                    raw: true,
                    type: Sequelize.QueryTypes.SELECT
                }
            ).then(portfolios => {
                return portfolios;
            })
        } catch (error) {
        throw error
        }
    },
    getHotCustomer: async () => {
        let now = new Date();
        try{
            return Sequelize.query(
                `select 
                id,
                partner_id,
                name,
                image_url,
                follower
                from (
                     SELECT
                     portfolio.partner_id,
                     portfolio.id,
                     name,
                     image_url,
                     follower,
                     ROW_NUMBER () OVER (PARTITION BY portfolio.partner_id
                         ORDER by portfolio.created_at desc) rowno
                     FROM
                     (
                         SELECT
                            partner_id,
                            count(user_id) follower
                         FROM
                            partner_follower
                         group by partner_id
                         order by count(user_id) desc
                         limit 5
                       ) hotpartner
                       inner join partner_portfolio portfolio
                       on portfolio.partner_id = hotpartner.partner_id
                 ) newportflio
                 where rowno = 1
                 order by follower desc
                 limit 5;`,
                { 
                    raw: true,
                    type: Sequelize.QueryTypes.SELECT
                }
            ).then(portfolios => {
                return portfolios;
            })
        } catch (error) {
        throw error
        }
    }
}
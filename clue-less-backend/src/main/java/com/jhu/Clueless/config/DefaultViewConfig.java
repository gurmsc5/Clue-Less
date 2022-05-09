package com.jhu.Clueless.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class DefaultViewConfig implements WebMvcConfigurer {
   @Override
   public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/").setViewName("/home.html");
      registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
   }

   /**  Turn on cross domain
    * source: https://chowdera.com/2022/03/202203082045152102.html

   @Override
   public void addCorsMappings(CorsRegistry registry) {

      //  Set routes that allow cross domain routing
      registry.addMapping("/**")
              //  Set the domain name that allows cross domain requests
              //.allowedOrigins("*")
              // Cross domain configuration error , take .allowedOrigins Replace with .allowedOriginPatterns that will do .
              .allowedOriginPatterns("*")
              //  Whether to allow certificates （cookies）
              .allowCredentials(true)
              //  Set allowed methods
              .allowedMethods("*")
              //  Cross domain allow time
              .maxAge(3600);
   }
    */

}

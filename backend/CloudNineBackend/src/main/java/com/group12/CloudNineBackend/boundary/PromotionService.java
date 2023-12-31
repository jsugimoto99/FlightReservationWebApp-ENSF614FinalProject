package com.group12.CloudNineBackend.boundary;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group12.CloudNineBackend.domain.Promotion;
import com.group12.CloudNineBackend.domain.RegisteredUser;

@Service
public class PromotionService {
	
	@Autowired
	private PromotionRepo promotionRepo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private UserRepo userRepo;
	
	public Promotion addPromotion(Promotion promotion) {
		
		Promotion savedPromotion = promotionRepo.save(promotion);
		
		List<RegisteredUser> usersToNotify = userRepo.findAll();
		
		for(RegisteredUser user: usersToNotify) {
			emailService.sendPromoEmail(user.getfName(),
					user.getEmail(), 
					savedPromotion.getDescription(),
					savedPromotion.getCode());
		}
		
		return savedPromotion;
		
	}

}
